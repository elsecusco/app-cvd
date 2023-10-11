export interface DocumentoExpediente {
  DatosExpediente: DatosExpediente;
  Documentos: Documento[];
}

export interface DatosExpediente {
  Guid?: string;
  NumeroExpediente?: string;
  Asunto?: string;
  Publicar?: number;
  PublicacionTemporal?: number;
  FechaPublicacion?: string;
  FechaFinPublicacion?: string;
  Cvd?: string;
}

export interface Documento {
  Guid?: string;
  NombreArchivo?: string;
  Publicar?: number;
}
