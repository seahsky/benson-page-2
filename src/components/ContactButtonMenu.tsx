import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { MessageCircle, MessageSquare, Facebook, AtSign, ChevronDown, ExternalLink } from 'lucide-react'
import { generateWhatsAppLink } from '@/lib/utils'
import { content, type Language } from '@/data/content'
import { cn } from '@/lib/utils'

interface ContactButtonMenuProps {
  // Display
  label: string
  language: Language

  // Behavior
  whatsappMessage?: string
  context?: string // For analytics tracking

  // Styling
  variant?: 'consultation' | 'package-select' | 'outline' | 'secondary' | 'default'
  size?: 'sm' | 'default' | 'lg' | 'xl'
  className?: string

  // Features
  showChannelHint?: boolean // Show "(4 channels)" hint
}

export default function ContactButtonMenu({
  label,
  language,
  whatsappMessage,
  context,
  variant = 'consultation',
  size = 'lg',
  className,
  showChannelHint = false,
}: ContactButtonMenuProps) {
  const [open, setOpen] = useState(false)

  // Get channel data from content
  const channels = content[language].contact.channels

  // Helper to get icon component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageCircle': return MessageCircle
      case 'MessageSquare': return MessageSquare
      case 'Facebook': return Facebook
      case 'AtSign': return AtSign
      default: return MessageCircle
    }
  }

  // Helper to get channel-specific styles
  const getChannelStyles = (channelName: string) => {
    switch (channelName) {
      case 'whatsapp':
        return {
          iconColor: 'text-green-600',
          bgColor: 'bg-green-50',
          hoverBg: 'hover:bg-green-100',
        }
      case 'line':
        return {
          iconColor: 'text-green-500',
          bgColor: 'bg-green-50',
          hoverBg: 'hover:bg-green-100',
        }
      case 'facebook':
        return {
          iconColor: 'text-blue-600',
          bgColor: 'bg-blue-50',
          hoverBg: 'hover:bg-blue-100',
        }
      case 'threads':
        return {
          iconColor: 'text-purple-600',
          bgColor: 'bg-purple-50',
          hoverBg: 'hover:bg-purple-100',
        }
      default:
        return {
          iconColor: 'text-primary',
          bgColor: 'bg-primary/10',
          hoverBg: 'hover:bg-primary/20',
        }
    }
  }

  // Generate link for each channel
  const getChannelLink = (channel: typeof channels[0]) => {
    if (channel.name === 'whatsapp' && whatsappMessage) {
      // Use custom message if provided
      return generateWhatsAppLink('85297020812', whatsappMessage)
    }
    return channel.link
  }

  // Handle channel selection (for analytics)
  const handleChannelClick = (channelName: string) => {
    if (context) {
      // Optional: Add analytics tracking here
      console.log('Channel selected:', {
        channel: channelName,
        context,
        language,
        timestamp: new Date().toISOString(),
      })
    }
    setOpen(false)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn(
            'group relative',
            language === 'zh' ? 'font-chinese' : '',
            className
          )}
          aria-label={`${label}. ${language === 'zh' ? '選擇 4 個聯絡方式之一' : 'Choose from 4 contact channels'}`}
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          {label}
          {showChannelHint && (
            <span className="ml-2 text-xs opacity-75">
              ({language === 'zh' ? '4個方式' : '4 channels'})
            </span>
          )}
          <ChevronDown
            className={cn(
              'ml-2 w-4 h-4 transition-transform duration-200',
              open && 'rotate-180'
            )}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        className="w-[280px] p-2"
        sideOffset={8}
      >
        {/* Header */}
        <div className={cn(
          'px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide',
          language === 'zh' ? 'font-chinese' : ''
        )}>
          {language === 'zh' ? '選擇聯絡方式' : 'Choose Contact Channel'}
        </div>

        <DropdownMenuSeparator />

        {/* Channel Options */}
        {channels.map((channel) => {
          const IconComponent = getIcon(channel.icon)
          const styles = getChannelStyles(channel.name)
          const link = getChannelLink(channel)

          return (
            <DropdownMenuItem
              key={channel.name}
              asChild
              className={cn(
                'cursor-pointer py-3 px-3 rounded-lg transition-colors',
                styles.hoverBg,
                channel.primary && 'bg-primary/5'
              )}
            >
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleChannelClick(channel.name)}
                className="flex items-center gap-3 w-full no-underline"
              >
                {/* Icon */}
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                  styles.bgColor
                )}>
                  <IconComponent className={cn('w-5 h-5', styles.iconColor)} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={cn(
                      'font-semibold text-sm',
                      language === 'zh' ? 'font-chinese' : ''
                    )}>
                      {channel.label}
                    </span>
                    {channel.primary && (
                      <Badge
                        variant="credential"
                        className={cn(
                          'text-xs px-2 py-0 h-5',
                          language === 'zh' ? 'font-chinese' : ''
                        )}
                      >
                        {language === 'zh' ? '推薦' : 'Recommended'}
                      </Badge>
                    )}
                  </div>
                  <div className={cn(
                    'text-xs text-muted-foreground truncate',
                    language === 'zh' ? 'font-chinese' : ''
                  )}>
                    {channel.value}
                  </div>
                </div>

                {/* External link indicator */}
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-50" />
              </a>
            </DropdownMenuItem>
          )
        })}

        {/* Footer hint */}
        <DropdownMenuSeparator className="my-2" />
        <div className={cn(
          'px-3 py-2 text-xs text-muted-foreground text-center',
          language === 'zh' ? 'font-chinese' : ''
        )}>
          {language === 'zh'
            ? '點擊以開啟您偏好的通訊平台'
            : 'Click to open your preferred platform'
          }
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
