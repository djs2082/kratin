from django.contrib import admin
from users.models import PatientModel,DoctorModel

admin.site.register(PatientModel)
admin.site.register(DoctorModel)
