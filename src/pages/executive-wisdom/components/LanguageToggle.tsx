import { Languages } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Language } from '@/data/content'

interface LanguageToggleProps {
  language: Language
  onLanguageChange: (language: Language) => void
}

export default function LanguageToggle({ language, onLanguageChange }: LanguageToggleProps) {
  return (
    <div className="fixed top-6 right-6 z-50 bg-white/90 backdrop-blur-sm border border-border rounded-lg p-1 shadow-lg">
      <div className="flex items-center gap-1">
        <Languages className="w-4 h-4 text-muted-foreground" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onLanguageChange('en')}
          className={cn(
            "h-8 px-3 text-sm transition-all duration-200",
            language === 'en'
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          EN
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onLanguageChange('zh')}
          className={cn(
            "h-8 px-3 text-sm transition-all duration-200 font-chinese",
            language === 'zh'
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          中文
        </Button>
      </div>
    </div>
  )
}