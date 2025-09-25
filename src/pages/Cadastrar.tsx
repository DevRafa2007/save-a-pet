import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { buscarEnderecoPorCEP } from '@/integrations/supabase/geocode';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Heart, Camera, FileCheck } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Cadastrar = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [photos, setPhotos] = useState<string[]>([]);
  const [temperaments, setTemperaments] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    breed: '',
    age: '',
    gender: '',
    size: '',
    weight: '',
    description: '',
    medicalHistory: '',
    specialNeeds: '',
    cep: '',
    bairro: '',
    cidade: '',
    estado: '',
    location: '',
    latitude: 0,
    longitude: 0,
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    vaccinated: false,
    neutered: false,
    dewormed: false,
  });

  const temperamentOptions = [
    'Carinhoso', 'Brincalhão', 'Calmo', 'Ativo', 'Sociável', 'Independente',
    'Protetor', 'Dócil', 'Inteligente', 'Obediente', 'Curioso', 'Tímido'
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCepSearch = async (cep: string) => {
    if (cep.length !== 8) return;

    try {
      const resultado = await buscarEnderecoPorCEP(cep);
      
      if (resultado) {
        setFormData(prev => ({
          ...prev,
          bairro: resultado.bairro,
          cidade: resultado.cidade,
          estado: resultado.estado,
          location: resultado.endereco_completo,
          latitude: resultado.coordenadas.lat,
          longitude: resultado.coordenadas.lng,
        }));

        toast({
          title: "Endereço encontrado!",
          description: "Os campos foram preenchidos automaticamente.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "CEP não encontrado",
          description: "Verifique se o CEP está correto.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao buscar CEP",
        description: "Ocorreu um erro ao buscar o endereço.",
      });
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setPhotos(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const toggleTemperament = (temperament: string) => {
    setTemperaments(prev => 
      prev.includes(temperament) 
        ? prev.filter(t => t !== temperament)
        : [...prev, temperament]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        variant: "destructive",
        title: "Erro de autenticação",
        description: "Você precisa estar logado para cadastrar um pet.",
      });
      return;
    }

    if (photos.length < 1) {
      toast({
        variant: "destructive",
        title: "Foto obrigatória",
        description: "Por favor, adicione pelo menos 1 foto do seu pet.",
      });
      return;
    }

    if (temperaments.length === 0) {
      toast({
        variant: "destructive",
        title: "Temperamento obrigatório",
        description: "Por favor, selecione pelo menos um temperamento.",
      });
      return;
    }

    const typeMap: { [key: string]: string } = {
      dog: 'Cão',
      cat: 'Gato',
    };

    const genderMap: { [key: string]: string } = {
      male: 'Macho',
      female: 'Fêmea',
    };

    const sizeMap: { [key: string]: string } = {
      small: 'Pequeno',
      medium: 'Médio',
      large: 'Grande',
    };

    const petData = {
      user_id: user.id,
      name: formData.name,
      type: typeMap[formData.type] || formData.type,
      breed: formData.breed,
      age: formData.age,
      gender: genderMap[formData.gender] || formData.gender,
      size: sizeMap[formData.size] || formData.size,
      temperament: temperaments,
      location: formData.location,
      description: formData.description,
      image_url: photos[0],
      vaccinated: formData.vaccinated,
      neutered: formData.neutered,
      cep: formData.cep,
      bairro: formData.bairro,
      cidade: formData.cidade,
      estado: formData.estado,
      coordenadas: `(${formData.latitude || 0}, ${formData.longitude || 0})`,
    };

    const { error } = await supabase.from('pets').insert([petData]);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao cadastrar o pet",
        description: error.message,
      });
    } else {
      toast({
        title: "Pet cadastrado com sucesso!",
        description: "Seu pet já está disponível para adoção.",
      });
      // Optionally, redirect or clear the form
      // window.location.href = '/adotar';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold">
              Cadastre seu <span className="text-primary">Pet para Adoção</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Ajude seu amiguinho a encontrar uma família amorosa. 
              Preencha as informações abaixo com carinho e detalhe.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Basic Information */}
              <Card className="border-0 shadow-soft bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-primary" />
                    Informações Básicas do Pet
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome do Pet *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Ex: Buddy"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="type">Tipo de Animal *</Label>
                      <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dog">Cão</SelectItem>
                          <SelectItem value="cat">Gato</SelectItem>
                          <SelectItem value="other">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="breed">Raça</Label>
                      <Input
                        id="breed"
                        value={formData.breed}
                        onChange={(e) => handleInputChange('breed', e.target.value)}
                        placeholder="Ex: Golden Retriever"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="age">Idade *</Label>
                      <Input
                        id="age"
                        value={formData.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        placeholder="Ex: 2 anos"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="gender">Sexo *</Label>
                      <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Macho</SelectItem>
                          <SelectItem value="female">Fêmea</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="size">Porte</Label>
                      <Select value={formData.size} onValueChange={(value) => handleInputChange('size', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o porte" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Pequeno</SelectItem>
                          <SelectItem value="medium">Médio</SelectItem>
                          <SelectItem value="large">Grande</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="weight">Peso Aproximado</Label>
                      <Input
                        id="weight"
                        value={formData.weight}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                        placeholder="Ex: 25kg"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="cep">CEP *</Label>
                        <Input
                          id="cep"
                          value={formData.cep}
                          onChange={(e) => {
                            const cep = e.target.value.replace(/\D/g, '');
                            handleInputChange('cep', cep);
                            if (cep.length === 8) {
                              handleCepSearch(cep);
                            }
                          }}
                          placeholder="Digite o CEP (somente números)"
                          maxLength={8}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bairro">Bairro</Label>
                        <Input
                          id="bairro"
                          value={formData.bairro}
                          onChange={(e) => handleInputChange('bairro', e.target.value)}
                          placeholder="Bairro"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="cidade">Cidade</Label>
                        <Input
                          id="cidade"
                          value={formData.cidade}
                          onChange={(e) => handleInputChange('cidade', e.target.value)}
                          placeholder="Cidade"
                          readOnly
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="estado">Estado</Label>
                        <Input
                          id="estado"
                          value={formData.estado}
                          onChange={(e) => handleInputChange('estado', e.target.value)}
                          placeholder="Estado"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Photos */}
              <Card className="border-0 shadow-soft bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-primary" />
                    Fotos do Pet (Mínimo 1) *
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative group aspect-square">
                        <img
                          src={photo}
                          alt={`Pet ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute top-2 right-2 w-6 h-6 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    
                    {photos.length < 6 && (
                      <label className="aspect-square border-2 border-dashed border-muted-foreground/30 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                        <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground text-center">
                          Adicionar Foto
                        </span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Temperament */}
              <Card className="border-0 shadow-soft bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    Temperamento *
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">Selecione as características que melhor descrevem seu pet:</p>
                  <div className="flex flex-wrap gap-2">
                    {temperamentOptions.map((temperament) => (
                      <Badge
                        key={temperament}
                        variant={temperaments.includes(temperament) ? "default" : "outline"}
                        className="cursor-pointer transition-all hover:scale-105"
                        onClick={() => toggleTemperament(temperament)}
                      >
                        {temperament}
                        {temperaments.includes(temperament) && (
                          <X className="w-3 h-3 ml-1" />
                        )}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card className="border-0 shadow-soft bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>Descrição e Histórico</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição do Pet *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Conte sobre a personalidade, hábitos e características especiais do seu pet..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="medicalHistory">Histórico Médico</Label>
                    <Textarea
                      id="medicalHistory"
                      value={formData.medicalHistory}
                      onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                      placeholder="Vacinas, tratamentos, cirurgias, medicamentos..."
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="specialNeeds">Necessidades Especiais</Label>
                    <Textarea
                      id="specialNeeds"
                      value={formData.specialNeeds}
                      onChange={(e) => handleInputChange('specialNeeds', e.target.value)}
                      placeholder="Cuidados especiais, restrições alimentares, medicamentos contínuos..."
                      className="min-h-[80px]"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Health Status */}
              <Card className="border-0 shadow-soft bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>Status de Saúde</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { key: 'vaccinated', label: 'Vacinado' },
                      { key: 'neutered', label: 'Castrado/Esterilizado' },
                      { key: 'dewormed', label: 'Vermifugado' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center space-x-2">
                        <Checkbox
                          id={item.key}
                          checked={formData[item.key as keyof typeof formData] as boolean}
                          onCheckedChange={(checked) => handleInputChange(item.key, checked)}
                        />
                        <Label htmlFor={item.key}>{item.label}</Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="border-0 shadow-soft bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>Informações de Contato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">Localização *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Cidade, Estado"
                      required
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Nome para Contato *</Label>
                      <Input
                        id="contactName"
                        value={formData.contactName}
                        onChange={(e) => handleInputChange('contactName', e.target.value)}
                        placeholder="Seu nome"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Telefone *</Label>
                      <Input
                        id="contactPhone"
                        value={formData.contactPhone}
                        onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                        placeholder="(11) 99999-9999"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">E-mail *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="text-center py-8">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="px-12 py-6 text-lg shadow-medium hover:shadow-strong hover:scale-105 transition-all duration-300"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Cadastrar Pet para Adoção
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cadastrar;
