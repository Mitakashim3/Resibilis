'use client';

import { useState } from 'react';
import { Button, Modal } from '@/components/ui';
import { 
  allTemplates, 
  ReceiptTemplate, 
  defaultTemplate,
  getTemplateById 
} from '@/lib/templates';
import { Crown, Check, Lock, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TemplateSelectorProps {
  selectedTemplateId: string;
  onSelectTemplate: (template: ReceiptTemplate) => void;
  isAuthenticated: boolean;
  ownedTemplateIds?: string[];
  isPremiumUser?: boolean;
}

export function TemplateSelector({
  selectedTemplateId,
  onSelectTemplate,
  isAuthenticated,
  ownedTemplateIds = [],
  isPremiumUser = false,
}: TemplateSelectorProps) {
  const [previewTemplate, setPreviewTemplate] = useState<ReceiptTemplate | null>(null);

  const canUseTemplate = (template: ReceiptTemplate): boolean => {
    if (!template.isPremium) return true;
    if (isPremiumUser) return true;
    if (ownedTemplateIds.includes(template.id)) return true;
    return false;
  };

  const handleSelectTemplate = (template: ReceiptTemplate) => {
    if (canUseTemplate(template)) {
      onSelectTemplate(template);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Receipt Template / Disenyo ng Resibo
        </label>
        {!isAuthenticated && (
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Lock className="w-3 h-3" />
            Sign in for premium templates
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {allTemplates.map((template) => {
          const isSelected = selectedTemplateId === template.id;
          const canUse = canUseTemplate(template);
          const isOwned = ownedTemplateIds.includes(template.id);

          return (
            <div key={template.id} className="relative">
              <button
                type="button"
                onClick={() => canUse ? handleSelectTemplate(template) : setPreviewTemplate(template)}
                className={cn(
                  'w-full aspect-[3/4] rounded-lg border-2 transition-all overflow-hidden',
                  'flex flex-col',
                  isSelected
                    ? 'border-green-500 ring-2 ring-green-200 dark:ring-green-800'
                    : canUse
                    ? 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    : 'border-gray-200 dark:border-gray-700 opacity-75'
                )}
                title={template.name}
              >
                {/* Template Preview */}
                <div 
                  className="flex-1 p-2"
                  style={{ 
                    backgroundColor: template.styles.backgroundColor,
                  }}
                >
                  {/* Mini receipt preview */}
                  <div
                    className="h-full rounded"
                    style={{
                      backgroundColor: template.styles.paperBackground,
                      border: template.styles.borderStyle !== 'none' 
                        ? `1px ${template.styles.borderStyle} ${template.styles.borderColor}`
                        : 'none',
                      borderRadius: `${template.styles.borderRadius / 2}px`,
                      padding: '4px',
                    }}
                  >
                    {/* Mini header */}
                    <div 
                      className="text-center mb-1 pb-1"
                      style={{ 
                        borderBottom: template.styles.showHeaderDivider 
                          ? `1px ${template.styles.dividerStyle} ${template.styles.dividerColor}`
                          : 'none',
                      }}
                    >
                      <div 
                        className="font-bold text-[6px] truncate"
                        style={{ color: template.styles.primaryColor }}
                      >
                        RESIBILIS
                      </div>
                    </div>
                    {/* Mini lines */}
                    <div className="space-y-0.5">
                      {[...Array(3)].map((_, i) => (
                        <div 
                          key={i}
                          className="h-1 rounded-full opacity-30"
                          style={{ 
                            backgroundColor: template.styles.textColor,
                            width: `${80 - i * 15}%`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Template Name */}
                <div className="p-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                    {template.name}
                  </p>
                  {template.isPremium && (
                    <p className="text-[10px] text-yellow-600 dark:text-yellow-400 flex items-center gap-0.5">
                      <Crown className="w-2.5 h-2.5" />
                      ₱{template.price}
                    </p>
                  )}
                </div>
              </button>

              {/* Status Badge */}
              {isSelected && (
                <div className="absolute top-1 right-1 p-1 bg-green-500 rounded-full">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
              {template.isPremium && !canUse && (
                <div className="absolute top-1 right-1 p-1 bg-gray-900/70 rounded-full">
                  <Lock className="w-3 h-3 text-white" />
                </div>
              )}
              {template.isPremium && isOwned && !isSelected && (
                <div className="absolute top-1 right-1 p-1 bg-yellow-500 rounded-full">
                  <Crown className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Preview Modal for locked templates */}
      <Modal
        isOpen={!!previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        title={previewTemplate?.name || 'Template Preview'}
      >
        {previewTemplate && (
          <div className="space-y-4">
            {/* Large Preview */}
            <div 
              className="aspect-[3/4] max-h-64 mx-auto rounded-lg overflow-hidden"
              style={{ 
                backgroundColor: previewTemplate.styles.backgroundColor,
                maxWidth: '200px',
              }}
            >
              <div
                className="h-full m-2 rounded"
                style={{
                  backgroundColor: previewTemplate.styles.paperBackground,
                  border: previewTemplate.styles.borderStyle !== 'none' 
                    ? `2px ${previewTemplate.styles.borderStyle} ${previewTemplate.styles.borderColor}`
                    : 'none',
                  borderRadius: `${previewTemplate.styles.borderRadius}px`,
                  padding: '12px',
                }}
              >
                <div 
                  className="text-center mb-2 pb-2"
                  style={{ 
                    borderBottom: previewTemplate.styles.showHeaderDivider 
                      ? `1px ${previewTemplate.styles.dividerStyle} ${previewTemplate.styles.dividerColor}`
                      : 'none',
                  }}
                >
                  <div 
                    className="font-bold text-sm"
                    style={{ 
                      color: previewTemplate.styles.primaryColor,
                      fontFamily: previewTemplate.styles.headerFontFamily || previewTemplate.styles.fontFamily,
                    }}
                  >
                    RESIBILIS
                  </div>
                  <div 
                    className="text-[8px]"
                    style={{ color: previewTemplate.styles.mutedColor }}
                  >
                    Official Receipt
                  </div>
                </div>
                <div className="space-y-1">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i}
                      className="h-2 rounded-full"
                      style={{ 
                        backgroundColor: previewTemplate.styles.textColor,
                        opacity: 0.2,
                        width: `${100 - i * 10}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {previewTemplate.description}
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                {previewTemplate.descriptionTl}
              </p>
            </div>

            {/* Price & CTA */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-lg text-gray-900 dark:text-white">
                  ₱{previewTemplate.price}
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                One-time purchase • Use forever
              </p>
              {isAuthenticated ? (
                <Button variant="primary" className="w-full">
                  Purchase Template
                </Button>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500">Sign in to purchase</p>
                  <Button variant="secondary" className="w-full" disabled>
                    Sign in Required
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
