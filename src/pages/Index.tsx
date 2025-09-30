import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LicensePlate {
  id: number;
  number: string;
  region: string;
  price: number;
  category: string;
  featured?: boolean;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const licensePlates: LicensePlate[] = [
    { id: 1, number: 'А 001 АА', region: '77', price: 250000, category: 'premium', featured: true },
    { id: 2, number: 'В 777 ВВ', region: '97', price: 450000, category: 'vip', featured: true },
    { id: 3, number: 'С 555 СС', region: '177', price: 380000, category: 'vip' },
    { id: 4, number: 'Е 080 ЕЕ', region: '197', price: 180000, category: 'premium' },
    { id: 5, number: 'К 999 КК', region: '99', price: 520000, category: 'vip', featured: true },
    { id: 6, number: 'М 123 ММ', region: '750', price: 150000, category: 'standard' },
    { id: 7, number: 'О 007 ОО', region: '77', price: 320000, category: 'premium' },
    { id: 8, number: 'Р 888 РР', region: '777', price: 480000, category: 'vip' },
  ];

  const regions = ['all', '77', '97', '99', '177', '197', '750', '777'];
  const categories = [
    { value: 'all', label: 'Все категории' },
    { value: 'standard', label: 'Стандарт' },
    { value: 'premium', label: 'Премиум' },
    { value: 'vip', label: 'VIP' },
  ];
  const priceRanges = [
    { value: 'all', label: 'Любая цена' },
    { value: '0-200', label: 'До 200 000 ₽' },
    { value: '200-400', label: '200 000 - 400 000 ₽' },
    { value: '400+', label: 'От 400 000 ₽' },
  ];

  const filteredPlates = licensePlates.filter((plate) => {
    const matchesSearch = plate.number.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || plate.region === selectedRegion;
    const matchesCategory = selectedCategory === 'all' || plate.category === selectedCategory;
    
    let matchesPrice = true;
    if (priceRange === '0-200') matchesPrice = plate.price < 200000;
    else if (priceRange === '200-400') matchesPrice = plate.price >= 200000 && plate.price < 400000;
    else if (priceRange === '400+') matchesPrice = plate.price >= 400000;

    return matchesSearch && matchesRegion && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md font-bold text-xl">
                АВТ
              </div>
              <span className="text-2xl font-bold">НОМЕРА</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#catalog" className="text-foreground/80 hover:text-foreground transition-colors">
                Каталог
              </a>
              <a href="#search" className="text-foreground/80 hover:text-foreground transition-colors">
                Поиск
              </a>
              <a href="#contacts" className="text-foreground/80 hover:text-foreground transition-colors">
                Контакты
              </a>
            </div>
            <Button className="bg-secondary hover:bg-secondary/90">
              <Icon name="Phone" size={18} className="mr-2" />
              Связаться
            </Button>
          </div>
        </div>
      </nav>

      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            ПРЕМИУМ АВТОНОМЕРА
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
            Эксклюзивные номерные знаки для вашего автомобиля. Более 500 вариантов в наличии
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto animate-scale-in">
            <div className="relative flex-1">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Введите номер (например, А 777 АА)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 h-12 px-8">
              <Icon name="Search" size={20} className="mr-2" />
              Найти номер
            </Button>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-12 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Каталог номеров</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger>
                <Icon name="MapPin" size={18} className="mr-2" />
                <SelectValue placeholder="Регион" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все регионы</SelectItem>
                {regions.filter(r => r !== 'all').map((region) => (
                  <SelectItem key={region} value={region}>
                    Регион {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <Icon name="Tag" size={18} className="mr-2" />
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <Icon name="DollarSign" size={18} className="mr-2" />
                <SelectValue placeholder="Цена" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSelectedRegion('all');
                setSelectedCategory('all');
                setPriceRange('all');
                setSearchQuery('');
              }}
            >
              <Icon name="X" size={18} className="mr-2" />
              Сбросить
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlates.map((plate) => (
              <Card
                key={plate.id}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              >
                <CardContent className="p-6">
                  {plate.featured && (
                    <Badge className="mb-3 bg-secondary">
                      <Icon name="Star" size={14} className="mr-1" />
                      Featured
                    </Badge>
                  )}
                  <div className="bg-primary text-primary-foreground rounded-lg p-4 mb-4 text-center">
                    <div className="text-xs mb-1">RUS</div>
                    <div className="text-3xl font-bold tracking-wider">{plate.number}</div>
                    <div className="text-sm mt-1 bg-white/20 inline-block px-2 py-0.5 rounded">
                      {plate.region}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Категория:</span>
                      <Badge variant="outline" className="capitalize">
                        {plate.category === 'vip' ? 'VIP' : plate.category === 'premium' ? 'Премиум' : 'Стандарт'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Цена:</span>
                      <span className="text-xl font-bold text-primary">
                        {plate.price.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-secondary hover:bg-secondary/90">
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    Купить
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPlates.length === 0 && (
            <div className="text-center py-12">
              <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">
                Номера не найдены. Попробуйте изменить фильтры
              </p>
            </div>
          )}
        </div>
      </section>

      <section id="contacts" className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Контакты</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Icon name="Phone" size={24} />
                  <span className="text-lg">+7 (999) 123-45-67</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Mail" size={24} />
                  <span className="text-lg">info@avtonomer.ru</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="MapPin" size={24} />
                  <span className="text-lg">Москва, ул. Примерная, д. 1</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Clock" size={24} />
                  <span className="text-lg">Пн-Пт: 9:00 - 20:00, Сб-Вс: 10:00 - 18:00</span>
                </div>
              </div>
            </div>
            <Card className="bg-white">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-foreground">Оставьте заявку</h3>
                <form className="space-y-4">
                  <Input placeholder="Ваше имя" />
                  <Input placeholder="Телефон" type="tel" />
                  <Input placeholder="Интересующий номер" />
                  <Button className="w-full bg-secondary hover:bg-secondary/90" size="lg">
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-sm opacity-80">
            © 2025 АВТОНОМЕРА. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;