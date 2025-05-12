
import React from 'react';
import { 
  AlertTriangle,
  Calendar,
  DollarSign,
  Info,
  Users
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface InfoCardProps {
  title: string;
  value: string | number;
  description?: string;
  type: 'calendar' | 'money' | 'users' | 'warning' | 'info';
  footer?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, value, description, type, footer }) => {
  const getIcon = () => {
    switch (type) {
      case 'calendar':
        return <Calendar className="h-4 w-4 text-muted-foreground" />;
      case 'money':
        return <DollarSign className="h-4 w-4 text-muted-foreground" />;
      case 'users':
        return <Users className="h-4 w-4 text-muted-foreground" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {getIcon()}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardContent>
      {footer && (
        <CardFooter>
          <p className="text-xs text-muted-foreground">{footer}</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default InfoCard;
