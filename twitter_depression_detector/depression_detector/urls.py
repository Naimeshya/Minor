from django.conf.urls import url
from .views import *

urlpatterns =[

url('depression_detector/',Twitter.as_view(),name='detector'),
]