"use client";

import { User, Mail, CreditCard, Shield, Calendar, CheckCircle, XCircle, Building, MapPin, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UsuarioDto, getUserFullName, getUserInitials } from "@/models/usuario";

interface AccountInfoProps {
  userData: UsuarioDto;
}

export function AccountInfo({ userData }: AccountInfoProps) {
  return (
    <div className="space-y-6">
      {/* Información principal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Información Personal
          </CardTitle>
          <CardDescription>Datos personales y de contacto</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar y nombre */}
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage 
                src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png" 
                alt="Avatar" 
              />
              <AvatarFallback className="text-xl">
                {getUserInitials(userData)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">
                {getUserFullName(userData)}
              </h3>
              <div className="flex items-center gap-2">
                <Badge variant={userData.activo ? "default" : "secondary"}>
                  {userData.activo ? "Activo" : "Inactivo"}
                </Badge>
                <Badge variant="outline">
                  {userData.tipouser || "Usuario"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Información de contacto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span className="font-medium">Correo Electrónico:</span>
              </div>
              <p className="text-gray-900 font-medium">{userData.email}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CreditCard className="h-4 w-4" />
                <span className="font-medium">DNI:</span>
              </div>
              <p className="text-gray-900 font-medium">{userData.dni || "No especificado"}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span className="font-medium">Usuario:</span>
              </div>
              <p className="text-gray-900 font-medium">{userData.usuario}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Building className="h-4 w-4" />
                <span className="font-medium">Cargo:</span>
              </div>
              <p className="text-gray-900 font-medium">{userData.car || "No especificado"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información de ubicación */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Información de Ubicación
          </CardTitle>
          <CardDescription>Datos de ubicación y estación</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">Dirección:</span>
              </div>
              <p className="text-gray-900 font-medium">{userData.direccion || "No especificada"}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Building className="h-4 w-4" />
                <span className="font-medium">Ciudad:</span>
              </div>
              <p className="text-gray-900 font-medium">{userData.ciudad || "No especificada"}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                <span className="font-medium">Estación Activa:</span>
              </div>
              <p className="text-gray-900 font-medium">{userData.estacionactiva || "No especificada"}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                <span className="font-medium">Estación Default:</span>
              </div>
              <p className="text-gray-900 font-medium">{userData.estaciondefault || "No especificada"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estado de la cuenta */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            Estado de la Cuenta
          </CardTitle>
          <CardDescription>Estado actual de tu cuenta en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              {userData.activo ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <div>
                <p className="font-medium text-gray-900">
                  {userData.activo ? "Cuenta Activa" : "Cuenta Inactiva"}
                </p>
                <p className="text-sm text-gray-600">
                  {userData.activo ? "Tu cuenta está activa" : "Tu cuenta está inactiva"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              {userData.estareg === 1 ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <div>
                <p className="font-medium text-gray-900">
                  {userData.estareg === 1 ? "Registro Activo" : "Registro Inactivo"}
                </p>
                <p className="text-sm text-gray-600">
                  {userData.estareg === 1 ? "Registro válido" : "Registro deshabilitado"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información adicional */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Información Adicional
          </CardTitle>
          <CardDescription>Detalles adicionales de tu cuenta</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span className="font-medium">Código de Usuario:</span>
              </div>
              <p className="text-gray-900 font-medium">{userData.codusu}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                <span className="font-medium">Nivel de Acceso:</span>
              </div>
              <p className="text-gray-900 font-medium">
                {userData.accesototal === 1 ? "Acceso Total" : 
                 userData.accesototal === 2 ? "Supervisor" : 
                 userData.accesototal === 3 ? "Inspector" : "Sin acceso"}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">Fecha de Ingreso:</span>
              </div>
              <p className="text-gray-900 font-medium">{userData.fechaingreso || "No especificada"}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                <span className="font-medium">Tipo de Usuario:</span>
              </div>
              <p className="text-gray-900 font-medium">{userData.tipouser || "No especificado"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 