# Component Library Guidelines

> **Context**: shadcn/ui implementation patterns and custom component guidelines  
> **Audience**: Developers building and maintaining UI components  
> **Prerequisites**: [Architecture](./architecture.md) - Technical setup and structure  

## 🔗 Quick Links
- [🏠 Main Overview](../../CLAUDE.md)
- [📚 All Docs](../README.md)
- [Architecture](./architecture.md) - Technical architecture
- [Design System](../design/design-system.md) - Visual design specifications

---

## 🧩 shadcn/ui Core Components

### Essential Components Installation
```bash
# Core UI Components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add tabs

# Form Components
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add label
npx shadcn-ui@latest add form
```

### Component Usage Patterns
```javascript
// Standard import pattern
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Usage with consistent styling
<Button className="w-full bg-primary hover:bg-primary-600">
  Book Consultation
</Button>

<Card className="hover:shadow-lg transition-all duration-300">
  <CardHeader>
    <CardTitle>Service Title</CardTitle>
    <CardDescription>Service description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Card content */}
  </CardContent>
</Card>
```

## 🎨 Custom Component Patterns

### ServiceCard Component
```javascript
// src/components/common/ServiceCard.jsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckIcon } from 'lucide-react';

export function ServiceCard({ 
  title, 
  description, 
  duration, 
  price, 
  features, 
  type,
  onBooking,
  className 
}) {
  return (
    <Card className={`h-full hover:shadow-lg transition-all duration-300 ${className}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          <Badge variant={type === 'coaching' ? 'default' : 'secondary'}>
            {duration}
          </Badge>
        </div>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-2xl font-bold text-primary">{price}</div>
          
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
          
          <Button 
            className="w-full mt-4 bg-primary hover:bg-primary-600" 
            onClick={onBooking}
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Usage example
const serviceData = {
  title: "Single Consultation",
  description: "One-time career coaching session",
  duration: "90 min",
  price: "$220 AUD",
  features: [
    "Career assessment",
    "Goal setting workshop", 
    "Action plan creation",
    "Resource recommendations"
  ],
  type: "coaching"
};

<ServiceCard {...serviceData} onBooking={handleBooking} />
```

### TestimonialCard Component
```javascript
// src/components/common/TestimonialCard.jsx
import { Card, CardContent } from '@/components/ui/card';
import { QuoteIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function TestimonialCard({ 
  quote, 
  client, 
  outcome, 
  background,
  industry,
  className 
}) {
  return (
    <Card className={`h-full ${className}`}>
      <CardContent className="p-6">
        <QuoteIcon className="w-8 h-8 text-primary mb-4" />
        
        <blockquote className="text-lg italic mb-4 leading-relaxed">
          "{quote}"
        </blockquote>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {industry}
            </Badge>
          </div>
          
          <div>
            <div className="font-semibold text-sm text-muted-foreground mb-1">
              Background:
            </div>
            <p className="text-sm">{background}</p>
          </div>
          
          <div>
            <div className="font-semibold text-sm text-green-600 mb-1">
              Outcome:
            </div>
            <p className="text-sm font-medium">{outcome}</p>
          </div>
          
          <div className="text-xs text-muted-foreground border-t pt-2">
            — {client}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

### LanguageToggle Component
```javascript
// src/components/common/LanguageToggle.jsx
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function LanguageToggle({ 
  currentLang, 
  onLanguageChange,
  className 
}) {
  return (
    <div className={cn(
      "flex items-center gap-1 bg-white/10 rounded-full p-1",
      className
    )}>
      <Button
        variant={currentLang === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onLanguageChange('en')}
        className={cn(
          "rounded-full text-xs px-3 py-1 h-7",
          currentLang === 'en' 
            ? "bg-white text-primary hover:bg-white/90" 
            : "text-white hover:bg-white/20"
        )}
      >
        EN
      </Button>
      <Button
        variant={currentLang === 'zh' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onLanguageChange('zh')}
        className={cn(
          "rounded-full text-xs px-3 py-1 h-7 font-chinese",
          currentLang === 'zh' 
            ? "bg-white text-primary hover:bg-white/90" 
            : "text-white hover:bg-white/20"
        )}
      >
        中文
      </Button>
    </div>
  );
}
```

### CTAButton Component
```javascript
// src/components/common/CTAButton.jsx
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function CTAButton({ 
  children,
  variant = 'primary',
  size = 'default',
  className,
  onClick,
  ...props 
}) {
  const variants = {
    primary: "bg-primary hover:bg-primary-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5",
    secondary: "bg-secondary hover:bg-secondary-600 text-primary shadow-lg hover:shadow-xl hover:-translate-y-0.5",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white"
  };

  return (
    <Button
      className={cn(
        "transition-all duration-200 font-medium",
        variants[variant],
        className
      )}
      size={size}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
}

// Usage examples
<CTAButton variant="primary" className="w-full">
  Book Consultation
</CTAButton>

<CTAButton variant="secondary" size="sm">
  Learn More
</CTAButton>

<CTAButton variant="outline">
  Contact Now
</CTAButton>
```

## 📱 Responsive Component Patterns

### Responsive Layout Component
```javascript
// src/components/layout/ResponsiveSection.jsx
import { cn } from '@/lib/utils';

export function ResponsiveSection({ 
  children, 
  className,
  containerSize = 'default',
  padding = 'default' 
}) {
  const containerSizes = {
    sm: 'max-w-4xl',
    default: 'max-w-6xl', 
    lg: 'max-w-7xl',
    full: 'max-w-full'
  };

  const paddingClasses = {
    none: '',
    sm: 'py-8 px-4',
    default: 'py-16 px-4 lg:py-20',
    lg: 'py-20 px-4 lg:py-24'
  };

  return (
    <section className={cn("w-full", paddingClasses[padding], className)}>
      <div className={cn(
        "mx-auto",
        containerSizes[containerSize]
      )}>
        {children}
      </div>
    </section>
  );
}
```

### Mobile Navigation Component
```javascript
// src/components/layout/MobileNavigation.jsx
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';

export function MobileNavigation({ menuItems, currentLang, onLanguageChange }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <nav className="flex flex-col space-y-4">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="justify-start"
              onClick={() => scrollToSection(item.href)}
            >
              {item.label}
            </Button>
          ))}
          
          <div className="pt-4 border-t">
            <LanguageToggle 
              currentLang={currentLang}
              onLanguageChange={onLanguageChange}
              className="w-full justify-center"
            />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
```

## 🎯 Form Components

### Contact Form Component
```javascript
// src/components/sections/ContactForm.jsx
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

export function ContactForm({ content, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    serviceInterest: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Generate WhatsApp message
      const message = `Hi Benson, I'm interested in your coaching services.

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Service Interest: ${formData.serviceInterest}
Message: ${formData.message}`;
      
      const whatsappUrl = `https://wa.me/85297020812?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      if (onSubmit) onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          {content.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{content.fields.name}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleInputChange('name')}
                required
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">{content.fields.email}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                required
                className="w-full"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">{content.fields.phone}</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange('phone')}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label>{content.fields.serviceInterest}</Label>
            <div className="flex flex-wrap gap-2">
              {['Single Session', '5-Session Package', '10-Session Package', 'APS Course', 'Networking Workshop'].map((service) => (
                <Badge
                  key={service}
                  variant={formData.serviceInterest === service ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    serviceInterest: prev.serviceInterest === service ? '' : service
                  }))}
                >
                  {service}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">{content.fields.message}</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={handleInputChange('message')}
              rows={4}
              className="w-full"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? content.submitting : content.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

## 🎨 Styling Patterns

### Component Styling Guidelines
```javascript
// Use consistent className patterns
const componentClasses = {
  // Base component styling
  base: "transition-all duration-200",
  
  // Size variants
  sizes: {
    sm: "text-sm p-2",
    md: "text-base p-4", 
    lg: "text-lg p-6"
  },
  
  // Color variants
  variants: {
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    muted: "bg-muted text-muted-foreground"
  },
  
  // State classes
  states: {
    hover: "hover:opacity-90 hover:-translate-y-0.5",
    focus: "focus:ring-2 focus:ring-primary focus:ring-offset-2",
    disabled: "disabled:opacity-50 disabled:cursor-not-allowed"
  }
};

// Usage in components
<div className={cn(
  componentClasses.base,
  componentClasses.sizes.md,
  componentClasses.variants.primary,
  componentClasses.states.hover,
  className
)}>
  Content
</div>
```

### Responsive Utility Classes
```css
/* Custom Tailwind utilities */
@layer utilities {
  .text-responsive {
    @apply text-sm sm:text-base lg:text-lg;
  }
  
  .padding-responsive {
    @apply p-4 sm:p-6 lg:p-8;
  }
  
  .container-responsive {
    @apply max-w-sm sm:max-w-lg lg:max-w-4xl xl:max-w-6xl;
  }
}
```

## 🔧 Component Testing Patterns

### Component Testing Template
```javascript
// Example component test structure
import { render, screen, fireEvent } from '@testing-library/react';
import { ServiceCard } from '../ServiceCard';

const mockProps = {
  title: "Test Service",
  description: "Test description",
  duration: "60 min",
  price: "$100",
  features: ["Feature 1", "Feature 2"],
  type: "coaching",
  onBooking: jest.fn()
};

describe('ServiceCard', () => {
  test('renders service information correctly', () => {
    render(<ServiceCard {...mockProps} />);
    
    expect(screen.getByText("Test Service")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
  });
  
  test('calls onBooking when Book Now button is clicked', () => {
    render(<ServiceCard {...mockProps} />);
    
    const bookButton = screen.getByText("Book Now");
    fireEvent.click(bookButton);
    
    expect(mockProps.onBooking).toHaveBeenCalled();
  });
});
```

## 📚 Component Documentation Template

### Component Props Documentation
```javascript
/**
 * ServiceCard Component
 * 
 * A reusable card component for displaying service information with booking functionality
 * 
 * @param {string} title - Service title
 * @param {string} description - Service description
 * @param {string} duration - Service duration (e.g., "90 min")
 * @param {string} price - Service price (e.g., "$220 AUD")
 * @param {string[]} features - Array of service features
 * @param {'coaching'|'course'|'workshop'} type - Service type for styling
 * @param {function} onBooking - Callback function when booking button is clicked
 * @param {string} className - Additional CSS classes
 * 
 * @example
 * <ServiceCard
 *   title="Career Coaching Session"
 *   description="One-on-one coaching session"
 *   duration="90 min"
 *   price="$220 AUD"
 *   features={["Career assessment", "Action plan"]}
 *   type="coaching"
 *   onBooking={() => handleBooking()}
 * />
 */
```

## 🔗 Related Documentation
- **[Architecture](./architecture.md)**: Technical architecture and project structure
- **[Design System](../design/design-system.md)**: Visual design specifications and color palette
- **[Development Workflow](./development-workflow.md)**: Development setup and best practices
- **[Responsive Design](../design/responsive-design.md)**: Responsive design patterns and breakpoints