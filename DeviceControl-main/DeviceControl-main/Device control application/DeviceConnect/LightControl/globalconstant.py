class Connect:
    # Class variable
    ipAddress = ''
    filter = ''
    lightCount = ''

    def __init__(self, ipAddress, filter, lightCount):
        self.ipAddress = ipAddress
        self.filter = filter
        self.lightCount = lightCount
