from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.index),
    path('chart',views.chart),
    path('individualLight/', views.individualLight),
    path('device_Connect/', views.device_Connect),
    path('show_LightList/', views.showLightList),
    path('ReadHistory/', views.readHistory),
    path('settings/', views.configSetting),
    path('empty/', views.clearHistory),
    path('export/', views.exportExecl)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)