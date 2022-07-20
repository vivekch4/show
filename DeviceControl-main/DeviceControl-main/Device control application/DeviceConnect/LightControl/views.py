import datetime
import json
import os
import operator
import pprint

import pandas as pd
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from pyModbusTCP.client import ModbusClient

from .globalconstant import Connect

_ipAddress = 0
Count = 0
isConnected = False
historyList = []
automaticAllTime = ''

automaticList = []


class LightControl:
    '''def __init__(self, name, isChecked: bool, chkboxid: str):
        self.name = name
        self.isChecked = isChecked
        self.chkboxid = chkboxid'''
    name: str
    isChecked: bool
    chkboxid: str
    value: str
    label: str

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)


# creating list
lists = []
newList = []

configList = []


@csrf_exempt
def device_Connect(req):
    con = Connect(str(req.POST['ip_address_id']), str(req.POST['filter']), str(req.POST['lightCount_Id']))
    global _ipAddress
    global Count
    global c
    global isConnected
    _ipAddress = con.ipAddress
    Count = con.lightCount
    c = ModbusClient(_ipAddress, debug=True)

    if str(req.POST['filter']) == 'disconnect':
        isConnected = c.close()
        Count = 0
        return JsonResponse({'isDisconnected': c.is_open(), 'filter': 'Disconnect'}, safe=False)
    elif str(req.POST['filter']) == 'reset':
        isConnected = c.close()
        lists.clear()
        Count = 0
        return JsonResponse({'isDisconnected': c.is_open(), 'filter': 'Reset'}, safe=False)
    else:
        isConnected = c.open()
        return JsonResponse({'isDisconnected': c.is_open(), 'filter': 'Connect'}, safe=False)
    return JsonResponse(c.open(), safe=False)


def index(req):
    # print('datetime', datetime.datetime.now().strftime('%Y-%m-%d %H:%M'))
    # print('date', datetime.datetime('2022-06-15T15:59').second)
    if len(configList) > 0:
        return render(req, 'Home.html',
                      {'config': configList, 'ipAddress': _ipAddress, 'Count': Count, 'lightCount': Count,
                       'isConnected': isConnected})

    return render(req, 'Home.html',
                  {'ipAddress': _ipAddress, 'Count': 0, 'lightCount': Count, 'isConnected': isConnected})


def chart(req):

    return render(req, 'chart.html' )



@csrf_exempt
def individualLight(req):
    registerValue = int(req.POST['registerValue'])
    ischecked = 1 if req.POST['isChecked'] == 'true' else 0
    rgistId = req.POST['rgistId']
    outPutValue = req.POST['outPutValue']

    dd = c.write_single_coil(registerValue, ischecked)
    data = []
    historyinsert = []
    json_dict = {}
    temObj = {}
    for item in lists:

        a = json.loads(item)
        if a['name'] == rgistId:
            a['isChecked'] = ischecked
            a['value'] = registerValue
            a['outPutValue'] = outPutValue

            x = datetime.datetime.now().strftime("%c")
            if os.path.exists("history.json"):
                with open('history.json', 'r') as handle:
                    new_json_dict = json.load(handle)
                    for i in new_json_dict["data"]:
                        data.append(i)

            with open("history.json", "w") as fp:
                temObj["datetime"] = x
                temObj["registervalue"] = registerValue
                temObj["isOn"] = "On" if ischecked else "Off"
                temObj["outPutValue"] = outPutValue
                data.append(temObj)
                json_dict["data"] = data
                json.dump(json_dict, fp, indent=4, sort_keys=True)
        newLts = json.dumps(a, indent=5)
        newList.append(newLts)
    lists.clear()
    lists.extend(newList)
    newList.clear()
    return JsonResponse(lists, safe=False)


def showLightList(req):
    if len(lists) == 0:
        count = 0
        for x in configList:
            obj = LightControl()
            obj.name = 'registindividualValue' + str(count)
            obj.isChecked = False
            obj.chkboxid = 'individuallight' + str(count)
            obj.value = x['value']
            obj.label = x['lable']
            count = count + 1
            lists.append(obj.toJSON())
    return JsonResponse(lists, safe=False)


@csrf_exempt
def configSetting(req):
    configList.clear()
    for list1 in json.loads(req.POST['data']):
        configList.append(list1)

    return JsonResponse("lists", safe=False)


def readHistory(req):
    historyList.clear()
    data = []
    if os.path.exists("history.json"):
        with open('history.json', 'r') as handle:
            new_json_dict = json.load(handle)
            for i in new_json_dict["data"]:
                data.append(i)

    # print(pprint.pprint(sorted(data, key=operator.itemgetter('datetime', 'registervalue'))))
    return JsonResponse(data, safe=False)


def clearHistory(req):
    try:
        if os.path.exists("history.json"):
            os.remove("history.json")
            return JsonResponse(True, safe=False)
        else:
            return JsonResponse(False, safe=False)

    except:
        return JsonResponse(False, safe=False)


def exportExecl(req):
    try:
        with open('history.json', 'r') as handle:
            new_json_dict = json.load(handle)
            df = pd.DataFrame(new_json_dict['data'])
            x = datetime.datetime.now().strftime("%m%d%Y_%H_%M_%S")
            fileName = "history_"
            fileExtension = ".xlsx"
            fullName = fileName + x + fileExtension
            df.to_excel(fullName)
            return JsonResponse(True, safe=False)

    except:
        return JsonResponse(False, safe=False)


@csrf_exempt
def automaticSchule(req):
    t = 0
    automaticList.clear();
    if len(automaticList) == 0:
        for list1 in json.loads(req.POST['data']):
            automaticList.append(list1)

    while True:
        for value in automaticList:

            if value['startTime'] == datetime.datetime.now().strftime('%Y-%m-%d %H:%M'):
                dd = c.write_single_coil(int(value['value']), 1)

                registerValue = int(value['value'])

                rgistId = value['rgistId']
                outPutValue = value['outPutValue']

                data = []
                historyinsert = []
                json_dict = {}
                temObj = {}
                for item in lists:

                    a = json.loads(item)
                    if a['name'] == rgistId:
                        a['isChecked'] = True
                        a['value'] = registerValue
                        a['outPutValue'] = outPutValue

                        x = value['startTime']
                        if os.path.exists("history.json"):
                            with open('history.json', 'r') as handle:
                                new_json_dict = json.load(handle)
                                for i in new_json_dict["data"]:
                                    data.append(i)

                        with open("history.json", "w") as fp:
                            temObj["datetime"] = x
                            temObj["registervalue"] = registerValue
                            temObj["isOn"] = "On"
                            temObj["outPutValue"] = outPutValue
                            data.append(temObj)
                            json_dict["data"] = data
                            json.dump(json_dict, fp, indent=4, sort_keys=True)
                    newLts = json.dumps(a, indent=5)
                    newList.append(newLts)
                lists.clear()
                lists.extend(newList)
                newList.clear()
                return JsonResponse(lists, safe=False)

            elif value['endTime'] == datetime.datetime.now().strftime('%Y-%m-%d %H:%M'):
                dd = c.write_single_coil(int(value['value']), 0)

    return JsonResponse("auto", safe=False)


