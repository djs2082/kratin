from rest_framework.response import Response
import traceback2 as traceback
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from requirements import success,error
from users.models import DoctorModel, PatientModel
from users.serializers import DoctorModelSerializer,PatientModelSerializer



class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        try:
            response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
            token = Token.objects.get(key=response.data['token'])
            response_message=success.APIResponse(200,{'token':token.key}).respond()
        except Exception as e:
            response_message=error.APIErrorResponse(404,{'error':str(e)}).respond()
        finally:
            return Response(response_message)

@api_view(['GET',])
@permission_classes([IsAuthenticated])
def get_doctor(request):
    try:
        user=request.user
        doctor=DoctorModel.objects.get(user=user)
        serializer  = DoctorModelSerializer(doctor)
        response = success.APIResponse(200, serializer.data).respond()
    except Exception as e:
        response = error.APIErrorResponse(400, str(e)).respond()
    finally:
        return Response(response)

    
@api_view(['GET',])
@permission_classes([IsAuthenticated])
def get_patient(request):
    try:
        user=request.user
        patient=PatientModel.objects.get(user=user)
        serializer  = PatientModelSerializer(patient)
        response = success.APIResponse(200, serializer.data).respond()
    except Exception as e:
        response = error.APIErrorResponse(400, str(e)).respond()
    finally:
        return Response(response)





