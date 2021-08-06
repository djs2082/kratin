from django.urls import path,include
from django.conf import settings
from treatment.views import get_symptoms,assign_doctor,get_requests,get_medicines,get_precautions,get_suggestions,assign_treatment
from django.conf.urls.static import static



urlpatterns = [
	path("get_symptoms/",get_symptoms),
    path('assign_doctor/',assign_doctor),
    path('get_requests/',get_requests),
    path('get_medicines/',get_medicines),
    path('get_precautions/',get_precautions),
    path('get_suggestions/',get_suggestions),
    path('assign_treatment/',assign_treatment)


]
