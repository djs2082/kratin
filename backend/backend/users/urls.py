from django.urls import path,include
from django.conf import settings
from .views import CustomObtainAuthToken
from django.conf.urls.static import static
from users.views import get_doctor,get_patient

app_name="owner"

urlpatterns = [
	path("login/",CustomObtainAuthToken.as_view(),name="CustomObtainAuthToken"),
	path("get_doctor/",get_doctor),
	path("get_patient/",get_patient)		
]
