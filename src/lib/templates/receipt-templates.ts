// Receipt Template Definitions
// Each template defines colors, fonts, and layout styles

export interface ReceiptTemplate {
  id: string;
  name: string;
  nameTl: string;
  description: string;
  descriptionTl: string;
  isPremium: boolean;
  price: number; // in PHP
  styles: TemplateStyles;
  previewImage?: string;
}

export interface TemplateStyles {
  // Background and container
  backgroundColor: string;
  paperBackground: string;
  borderColor: string;
  borderStyle: 'solid' | 'dashed' | 'double' | 'none';
  borderRadius: number;
  
  // Typography
  fontFamily: string;
  headerFontFamily?: string;
  
  // Colors
  primaryColor: string;      // Main accent color
  secondaryColor: string;    // Secondary text
  textColor: string;         // Main text
  mutedColor: string;        // Muted text (labels, etc)
  
  // Header styling
  headerStyle: 'centered' | 'left' | 'right';
  headerBackground?: string;
  showHeaderDivider: boolean;
  
  // Divider styling
  dividerStyle: 'dashed' | 'solid' | 'dotted' | 'double' | 'none';
  dividerColor: string;
  
  // Special effects
  showWatermark?: boolean;
  watermarkText?: string;
  showLogo?: boolean;
}

// Default/Free Template
export const defaultTemplate: ReceiptTemplate = {
  id: 'default',
  name: 'Classic Receipt',
  nameTl: 'Klasikong Resibo',
  description: 'Clean and simple receipt design',
  descriptionTl: 'Malinis at simpleng disenyo ng resibo',
  isPremium: false,
  price: 0,
  styles: {
    backgroundColor: '#FFFFFF',
    paperBackground: '#FFFFFF',
    borderColor: '#e5e7eb',
    borderStyle: 'solid',
    borderRadius: 8,
    fontFamily: "'Courier New', 'Consolas', monospace",
    primaryColor: '#000000',
    secondaryColor: '#6b7280',
    textColor: '#000000',
    mutedColor: '#9ca3af',
    headerStyle: 'centered',
    showHeaderDivider: true,
    dividerStyle: 'dashed',
    dividerColor: '#d1d5db',
  },
};

// Premium Templates
export const premiumTemplates: ReceiptTemplate[] = [
  {
    id: 'modern-clean',
    name: 'Modern Clean',
    nameTl: 'Modernong Malinis',
    description: 'Sleek and professional with subtle gradients',
    descriptionTl: 'Elegante at propesyonal na disenyo',
    isPremium: true,
    price: 50,
    styles: {
      backgroundColor: '#f8fafc',
      paperBackground: '#FFFFFF',
      borderColor: '#e2e8f0',
      borderStyle: 'solid',
      borderRadius: 12,
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      headerFontFamily: "'Inter', 'Segoe UI', sans-serif",
      primaryColor: '#0f172a',
      secondaryColor: '#64748b',
      textColor: '#1e293b',
      mutedColor: '#94a3b8',
      headerStyle: 'centered',
      headerBackground: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      showHeaderDivider: false,
      dividerStyle: 'solid',
      dividerColor: '#e2e8f0',
    },
  },
  {
    id: 'classic-professional',
    name: 'Classic Professional',
    nameTl: 'Klasikong Propesyonal',
    description: 'Traditional business receipt style',
    descriptionTl: 'Tradisyonal na istilo ng negosyo',
    isPremium: true,
    price: 50,
    styles: {
      backgroundColor: '#FFFFFF',
      paperBackground: '#fffef7',
      borderColor: '#1a1a1a',
      borderStyle: 'double',
      borderRadius: 0,
      fontFamily: "'Times New Roman', 'Georgia', serif",
      headerFontFamily: "'Times New Roman', 'Georgia', serif",
      primaryColor: '#1a1a1a',
      secondaryColor: '#4a4a4a',
      textColor: '#1a1a1a',
      mutedColor: '#6b6b6b',
      headerStyle: 'centered',
      showHeaderDivider: true,
      dividerStyle: 'double',
      dividerColor: '#1a1a1a',
    },
  },
  {
    id: 'minimal-mono',
    name: 'Minimal Mono',
    nameTl: 'Minimalistang Mono',
    description: 'Ultra minimal design with monospace font',
    descriptionTl: 'Napakasimpleng disenyo',
    isPremium: true,
    price: 50,
    styles: {
      backgroundColor: '#FFFFFF',
      paperBackground: '#FFFFFF',
      borderColor: 'transparent',
      borderStyle: 'none',
      borderRadius: 0,
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      primaryColor: '#000000',
      secondaryColor: '#666666',
      textColor: '#000000',
      mutedColor: '#999999',
      headerStyle: 'left',
      showHeaderDivider: false,
      dividerStyle: 'none',
      dividerColor: 'transparent',
    },
  },
  {
    id: 'colorful-fiesta',
    name: 'Colorful Fiesta',
    nameTl: 'Makulay na Pista',
    description: 'Vibrant Filipino-inspired colors',
    descriptionTl: 'Makulay na inspirasyon mula sa Pilipinas',
    isPremium: true,
    price: 75,
    styles: {
      backgroundColor: '#fef3c7',
      paperBackground: '#FFFFFF',
      borderColor: '#f59e0b',
      borderStyle: 'solid',
      borderRadius: 16,
      fontFamily: "'Poppins', 'Nunito', sans-serif",
      headerFontFamily: "'Poppins', 'Nunito', sans-serif",
      primaryColor: '#dc2626',
      secondaryColor: '#2563eb',
      textColor: '#1f2937',
      mutedColor: '#6b7280',
      headerStyle: 'centered',
      headerBackground: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
      showHeaderDivider: true,
      dividerStyle: 'dashed',
      dividerColor: '#f59e0b',
    },
  },
  {
    id: 'luxury-gold',
    name: 'Luxury Gold',
    nameTl: 'Marangyang Ginto',
    description: 'Premium gold accents for high-end businesses',
    descriptionTl: 'Premyum na gintong disenyo para sa mataas na klase',
    isPremium: true,
    price: 100,
    styles: {
      backgroundColor: '#1a1a1a',
      paperBackground: '#0a0a0a',
      borderColor: '#d4af37',
      borderStyle: 'solid',
      borderRadius: 8,
      fontFamily: "'Playfair Display', 'Georgia', serif",
      headerFontFamily: "'Playfair Display', 'Georgia', serif",
      primaryColor: '#d4af37',
      secondaryColor: '#c9a227',
      textColor: '#f5f5f5',
      mutedColor: '#a3a3a3',
      headerStyle: 'centered',
      showHeaderDivider: true,
      dividerStyle: 'solid',
      dividerColor: '#d4af37',
      showWatermark: true,
      watermarkText: 'PREMIUM',
    },
  },
  {
    id: 'eco-green',
    name: 'Eco Green',
    nameTl: 'Berdeng Eco',
    description: 'Nature-inspired design for eco-friendly businesses',
    descriptionTl: 'Disenyo para sa mga negosyong eco-friendly',
    isPremium: true,
    price: 50,
    styles: {
      backgroundColor: '#ecfdf5',
      paperBackground: '#FFFFFF',
      borderColor: '#10b981',
      borderStyle: 'solid',
      borderRadius: 12,
      fontFamily: "'Nunito', 'Open Sans', sans-serif",
      primaryColor: '#059669',
      secondaryColor: '#10b981',
      textColor: '#064e3b',
      mutedColor: '#6b7280',
      headerStyle: 'centered',
      headerBackground: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
      showHeaderDivider: true,
      dividerStyle: 'dashed',
      dividerColor: '#10b981',
    },
  },
  {
    id: 'tech-neon',
    name: 'Tech Neon',
    nameTl: 'Tech na Neon',
    description: 'Futuristic neon style for tech businesses',
    descriptionTl: 'Makabagong istilo para sa tech na negosyo',
    isPremium: true,
    price: 75,
    styles: {
      backgroundColor: '#0f0f23',
      paperBackground: '#1a1a2e',
      borderColor: '#00d4ff',
      borderStyle: 'solid',
      borderRadius: 8,
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      primaryColor: '#00d4ff',
      secondaryColor: '#ff00ff',
      textColor: '#e0e0e0',
      mutedColor: '#888888',
      headerStyle: 'centered',
      showHeaderDivider: true,
      dividerStyle: 'solid',
      dividerColor: '#00d4ff',
    },
  },
];

// All templates combined
export const allTemplates: ReceiptTemplate[] = [defaultTemplate, ...premiumTemplates];

// Get template by ID
export function getTemplateById(id: string): ReceiptTemplate {
  return allTemplates.find(t => t.id === id) || defaultTemplate;
}

// Get free templates only
export function getFreeTemplates(): ReceiptTemplate[] {
  return allTemplates.filter(t => !t.isPremium);
}

// Get premium templates only
export function getPremiumTemplates(): ReceiptTemplate[] {
  return allTemplates.filter(t => t.isPremium);
}
