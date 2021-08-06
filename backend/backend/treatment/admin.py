from django.contrib import admin
from treatment.models import SymptomsModel,RequestsModel,PatientSymptomsModel,ParameterModel,PatientParameterModel,MedicinesModel,DoctorMedicinesModel,RequestMedicinesModel,PrecautionModel,DoctorPrecautionModel,RequestPrecautionModel,SuggestionModel,DoctorSuggestionModel,RequestSuggestionModel

admin.site.register(SymptomsModel)
admin.site.register(RequestsModel)
admin.site.register(PatientSymptomsModel)
admin.site.register(ParameterModel)
admin.site.register(PatientParameterModel)
admin.site.register(MedicinesModel)
admin.site.register(DoctorMedicinesModel)
admin.site.register(RequestMedicinesModel)
admin.site.register(PrecautionModel)
admin.site.register(DoctorPrecautionModel)
admin.site.register(RequestPrecautionModel)
admin.site.register(SuggestionModel)
admin.site.register(DoctorSuggestionModel)
admin.site.register(RequestSuggestionModel)



# Register your models here.
