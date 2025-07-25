/**
 * Utilitários para autenticação NFC e crachá digital
 */

import { 
  NFCCard, 
  NFCReadResult, 
  NFCAuthResponse, 
  NFCConfig, 
  NFCPermission,
  NFCAuditLog,
  NFCScanResult
} from "@/types/nfc";
import { Location } from "@/lib/geolocation";
// import { prisma } from './prisma'; // Temporariamente comentado

/**
 * Configurações padrão para NFC
 */
export const DEFAULT_NFC_CONFIG: NFCConfig = {
  timeout: 10000, // 10 segundos
  retryCount: 3,
  requireLocation: true,
  requireDeviceValidation: true,
  allowedCardTypes: ['STANDARD', 'VIP', 'TEMPORARY'],
  maxDistance: 100, // 100 metros
};

/**
 * Verifica se o dispositivo suporta NFC
 */
export function isNFCSupported(): boolean {
  return 'NDEFReader' in window || 'nfc' in navigator;
}

/**
 * Gera ID único para dispositivo
 */
export function generateDeviceId(): string {
  const userAgent = navigator.userAgent;
  const screenInfo = `${screen.width}x${screen.height}`;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const data = `${userAgent}-${screenInfo}-${timeZone}`;
  return btoa(data).replace(/[^a-zA-Z0-9]/g, "").substring(0, 16);
}

/**
 * Detecta tipo de dispositivo
 */
export function getDeviceType(): 'MOBILE' | 'DESKTOP' | 'TERMINAL' {
  const userAgent = navigator.userAgent.toLowerCase();
  if (/mobile|android|iphone|ipad|phone/.test(userAgent)) {
    return 'MOBILE';
  }
  if (/terminal|kiosk|point-of-sale/.test(userAgent)) {
    return 'TERMINAL';
  }
  return 'DESKTOP';
}

/**
 * Simula leitura de crachá NFC (em produção, seria integrado com Web NFC API)
 */
export async function readNFCCard(
  _config: NFCConfig = DEFAULT_NFC_CONFIG
): Promise<NFCReadResult> {
  try {
    // Verifica se NFC está disponível
    if (!isNFCSupported()) {
      throw new Error("NFC não suportado neste dispositivo");
    }

    // Simula delay de leitura
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Simula dados do crachá (em produção, viria da leitura real)
    // Temporariamente comentado até a migração ser aplicada
    // const mockCardData: NFCCard = {
    //   id: "card_" + Date.now(),
    //   cardNumber: "NFC" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    //   employeeId: "1", // Mock employee ID
    //   status: "ACTIVE",
    //   issuedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 dias atrás
    //   lastUsedAt: new Date().toISOString(),
    //   usageCount: Math.floor(Math.random() * 100),
    //   permissions: ['TIME_RECORD_ENTRY', 'TIME_RECORD_EXIT', 'TIME_RECORD_BREAK'],
    //   metadata: {
    //     cardType: 'STANDARD',
    //     department: 'TI',
    //     role: 'Desenvolvedor',
    //   },
    // };

    // Dados temporários
    const mockCardData: NFCCard = {
      id: "card_" + Date.now(),
      cardNumber: "NFC" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      employeeId: "1", // Mock employee ID
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Obtém informações do dispositivo
    const deviceInfo = {
      deviceId: generateDeviceId(),
      deviceType: getDeviceType(),
      userAgent: navigator.userAgent,
    };

    return {
      success: true,
      cardData: mockCardData,
      timestamp: new Date().toISOString(),
      deviceInfo,
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    return {
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString(),
      deviceInfo: {
        deviceId: generateDeviceId(),
        deviceType: getDeviceType(),
        userAgent: navigator.userAgent,
      },
    };
  }
}

/**
 * Valida crachá NFC
 */
export function validateNFCCard(card: NFCCard, _config: NFCConfig = DEFAULT_NFC_CONFIG): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  // Temporariamente comentado até a migração ser aplicada
  // const errors: string[] = [];
  // const warnings: string[] = [];

  // // Verifica status do crachá
  // if (card.status !== 'ACTIVE') {
  //   errors.push(`Crachá ${card.status.toLowerCase()}`);
  // }

  // // Verifica expiração
  // if (card.expiresAt && new Date(card.expiresAt) < new Date()) {
  //   errors.push("Crachá expirado");
  // }

  // // Verifica limite de usos
  // if (card.maxUsageCount && card.usageCount >= card.maxUsageCount) {
  //   errors.push("Limite de usos do crachá atingido");
  // }

  // // Verifica tipo de crachá permitido
  // if (!config.allowedCardTypes.includes(card.metadata?.cardType || 'STANDARD')) {
  //   errors.push("Tipo de crachá não permitido");
  // }

  // // Avisos
  // if (card.usageCount > 50) {
  //   warnings.push("Crachá com alto uso");
  // }

  // if (card.lastUsedAt) {
  //   const lastUsed = new Date(card.lastUsedAt);
  //   const now = new Date();
  //   const hoursSinceLastUse = (now.getTime() - lastUsed.getTime()) / (1000 * 60 * 60);
    
  //   if (hoursSinceLastUse < 1) {
  //     warnings.push("Crachá usado recentemente");
  //   }
  // }

  // return {
  //   isValid: errors.length === 0,
  //   errors,
  //   warnings,
  // };

  // Retorno temporário
  return {
    isValid: true,
    errors: [],
    warnings: [],
  };
}

/**
 * Autentica funcionário via NFC
 */
export async function authenticateViaNFC(
  cardData: NFCCard,
  location?: Location,
  config: NFCConfig = DEFAULT_NFC_CONFIG
): Promise<NFCAuthResponse> {
  try {
    // Valida crachá
    const validation = validateNFCCard(cardData, config);
    
    if (!validation.isValid) {
      return {
        success: false,
        authenticated: false,
        error: validation.errors.join(", "),
        warnings: validation.warnings,
      };
    }

    // Simula busca de dados do funcionário (em produção, viria do banco)
    const employeeData = {
      id: cardData.employeeId,
      name: "João Silva", // Mock
      cpf: "123.456.789-00", // Mock
      role: cardData.metadata?.role || "Funcionário",
      department: cardData.metadata?.department,
    };

    // Simula registro de ponto
    const timeRecord = {
      id: "record_" + Date.now(),
      type: "ENTRY" as const, // Em produção, seria determinado pela lógica de negócio
      timestamp: new Date().toISOString(),
      hash: generateTimeRecordHash(cardData, new Date()),
    };

    return {
      success: true,
      authenticated: true,
      cardData,
      employeeData,
      timeRecord,
      warnings: validation.warnings,
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    return {
      success: false,
      authenticated: false,
      error: errorMessage,
    };
  }
}

/**
 * Gera hash para registro de ponto via NFC
 */
export function generateTimeRecordHash(card: NFCCard, timestamp: Date): string {
  const data = `${card.id}-${card.employeeId}-${card.companyId}-${timestamp.getTime()}`;
  return btoa(data).replace(/[^a-zA-Z0-9]/g, "");
}

/**
 * Cria log de auditoria NFC
 */
export function createNFCAuditLog(
  card: NFCCard,
  action: NFCAuditLog['action'],
  details: string,
  location?: Location
): NFCAuditLog {
  return {
    id: "audit_" + Date.now(),
    cardId: card.id,
    employeeId: card.employeeId,
    companyId: card.companyId || '',
    action,
    timestamp: new Date().toISOString(),
    location,
    deviceInfo: {
      deviceId: generateDeviceId(),
      deviceType: getDeviceType(),
      userAgent: navigator.userAgent,
      ipAddress: undefined, // Seria obtido do backend
    },
    details,
    metadata: {
      cardType: card.metadata?.cardType,
      department: card.metadata?.department,
      role: card.metadata?.role,
    },
  };
}

/**
 * Verifica permissões do crachá
 */
export function hasNFCPermission(card: NFCCard, permission: NFCPermission): boolean {
  return card.permissions?.includes(permission) || false;
}

/**
 * Formata número do crachá para exibição
 */
export function formatCardNumber(cardNumber: string): string {
  // Adiciona espaços a cada 4 caracteres para melhor legibilidade
  return cardNumber.replace(/(.{4})/g, "$1 ").trim();
}

/**
 * Calcula tempo restante do crachá
 */
export function getCardTimeRemaining(card: NFCCard): {
  isExpired: boolean;
  daysRemaining?: number;
  hoursRemaining?: number;
} {
  if (!card.expiresAt) {
    return { isExpired: false };
  }

  const now = new Date();
  const expiresAt = new Date(card.expiresAt);
  const timeRemaining = expiresAt.getTime() - now.getTime();

  if (timeRemaining <= 0) {
    return { isExpired: true };
  }

  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return {
    isExpired: false,
    daysRemaining,
    hoursRemaining,
  };
}

/**
 * Simula leitura de cartão NFC
 * Em produção, isso seria integrado com hardware real
 */
export function simulateNFCScan(): string {
  // Simula um número de cartão NFC (formato: NFC-XXXXXXXX)
  const randomId = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `NFC-${randomId}`;
}

/**
 * Valida formato de número de cartão NFC
 */
export function validateNFCCardNumber(cardNumber: string): boolean {
  // Formato esperado: NFC-XXXXXXXX (8 caracteres alfanuméricos)
  const nfcPattern = /^NFC-[A-Z0-9]{8}$/;
  return nfcPattern.test(cardNumber);
}

/**
 * Busca cartão NFC por número
 */
export async function findNFCCard(_cardNumber: string): Promise<NFCCard | null> {
  // Temporariamente comentado até a migração ser aplicada
  // try {
  //   const card = await prisma.nFCCard.findUnique({
  //     where: { cardNumber },
  //     include: {
  //       employee: {
  //       include: {
  //         user: true,
  //         company: true,
  //       },
  //     },
  //   });

  //   return card;
  // } catch (error) {
  //   console.error('Erro ao buscar cartão NFC:', error);
  //   return null;
  // }

  // Retorno temporário
  return null;
}

/**
 * Registra uso do cartão NFC
 */
export async function recordNFCUsage(_cardId: string): Promise<void> {
  // Temporariamente comentado até a migração ser aplicada
  // try {
  //   await prisma.nFCCard.update({
  //     where: { id: cardId },
  //     data: { lastUsed: new Date() },
  //   });
  // } catch (error) {
  //   console.error('Erro ao registrar uso do cartão NFC:', error);
  // }
}

/**
 * Processa scan de cartão NFC
 */
export async function processNFCScan(cardNumber: string): Promise<NFCScanResult> {
  try {
    // Valida formato do cartão
    if (!validateNFCCardNumber(cardNumber)) {
      return {
        success: false,
        error: 'Formato de cartão inválido',
      };
    }

    // Busca cartão no banco
    const card = await findNFCCard(cardNumber);
    
    if (!card) {
      return {
        success: false,
        error: 'Cartão não encontrado',
      };
    }

    if (!card.isActive) {
      return {
        success: false,
        error: 'Cartão inativo',
      };
    }

    // Registra uso
    await recordNFCUsage(card.id);

    return {
      success: true,
      cardNumber: card.cardNumber,
      employeeId: card.employeeId,
    };
  } catch (error) {
    console.error('Erro ao processar scan NFC:', error);
    return {
      success: false,
      error: 'Erro interno do sistema',
    };
  }
}

/**
 * Cria novo cartão NFC
 */
export async function createNFCCard(_employeeId: string, _cardNumber?: string): Promise<NFCCard | null> {
  // Temporariamente comentado até a migração ser aplicada
  // try {
  //   const finalCardNumber = cardNumber || generateNFCCardNumber();
    
  //   const card = await prisma.nFCCard.create({
  //     data: {
  //       cardNumber: finalCardNumber,
  //       employeeId,
  //     },
  //   });

  //   return card;
  // } catch (error) {
  //   console.error('Erro ao criar cartão NFC:', error);
  //   return null;
  // }

  // Retorno temporário
  return null;
}

/**
 * Gera número único de cartão NFC
 */
export function generateNFCCardNumber(): string {
  const randomId = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `NFC-${randomId}`;
}

/**
 * Desativa cartão NFC
 */
export async function deactivateNFCCard(_cardId: string): Promise<boolean> {
  // Temporariamente comentado até a migração ser aplicada
  // try {
  //   await prisma.nFCCard.update({
  //     where: { id: cardId },
  //     data: { isActive: false },
  //   });
  //   return true;
  // } catch (error) {
  //   console.error('Erro ao desativar cartão NFC:', error);
  //   return false;
  // }

  // Retorno temporário
  return false;
} 