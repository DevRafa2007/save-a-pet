import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Heart, Camera, FileCheck, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: string;
  gender: string;
  size: string;
  weight: string;
  description: string;
  vaccinated: boolean;
  neutered: boolean;
  image_url: string;
  temperament: string[];
}

const EditarPet = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState<string | null>(null);
  const [temperaments, setTemperaments] = useState<string[]>([]);
  const [formData, setFormData] = useState<Pet | null>(null);

  useEffect(() => {
    const fetchPetData = async () => {
      if (!id || !user) {
        navigate('/auth');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('pets')
          .select('*')
          .eq('id', id)
          .eq('user_id', user.id)
          .single();

        if (error || !data) throw error || new Error('Pet not found');

        const typeMap: { [key: string]: string } = { 'Cão': 'dog', 'Gato': 'cat' };
        const genderMap: { [key: string]: string } = { 'Macho': 'male', 'Fêmea': 'female' };
        const sizeMap: { [key: string]: string } = { 'Pequeno': 'small', 'Médio': 'medium', 'Grande': 'large' };

        setFormData({
          ...data,
          type: typeMap[data.type] || data.type,
          gender: genderMap[data.gender] || data.gender,
          size: sizeMap[data.size] || data.size,
        });
        setPhoto(data.image_url || null);
        setTemperaments(data.temperament || []);
      } catch (error) {
        console.error('Error fetching pet data:', error);
        toast({ title: "Erro", description: "Pet não encontrado ou você não tem permissão para editá-lo.", variant: "destructive" });
        navigate('/meus-pets');
      } finally {
        setLoading(false);
      }
    };

    fetchPetData();
  }, [id, user, navigate, toast]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPhoto(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhoto(null);
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
    if (!formData) return;

    const typeMap: { [key: string]: string } = { dog: 'Cão', cat: 'Gato' };
    const genderMap: { [key: string]: string } = { male: 'Macho', female: 'Fêmea' };
    const sizeMap: { [key: string]: string } = { small: 'Pequeno', medium: 'Médio', large: 'Grande' };

    const petData: Pet = {
      id: formData.id,
      name: formData.name,
      type: typeMap[formData.type] || formData.type,
      breed: formData.breed,
      age: formData.age,
      gender: genderMap[formData.gender] || formData.gender,
      size: sizeMap[formData.size] || formData.size,
      weight: formData.weight,
      description: formData.description,
      vaccinated: formData.vaccinated,
      neutered: formData.neutered,
      image_url: photo || '',
      temperament: temperaments,
    };

    const { error } = await supabase.from('pets').update(petData).eq('id', id);

    if (error) {
      toast({ variant: "destructive", title: "Erro ao atualizar o pet", description: error.message });
    } else {
      toast({ title: "Pet atualizado com sucesso!" });
      navigate('/meus-pets');
    }
  };

  if (loading || !formData) {
    return <div>Carregando...</div>; // Or a proper skeleton loader
  }

  const temperamentOptions = [
    'Carinhoso', 'Brincalhão', 'Calmo', 'Ativo', 'Sociável', 'Independente',
    'Protetor', 'Dócil', 'Inteligente', 'Obediente', 'Curioso', 'Tímido'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <Button variant="ghost" onClick={() => navigate('/meus-pets')} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para Meus Pets
        </Button>
        <h1 className="text-3xl font-bold mb-8">Editar Pet: {formData.name}</h1>
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
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
                        value={formData.weight || ''}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                        placeholder="Ex: 25kg"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Photo */}
              <Card className="border-0 shadow-soft bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-primary" />
                    Foto do Pet
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {photo && (
                      <div className="relative group aspect-square">
                        <img
                          src={photo}
                          alt={`Pet`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={removePhoto}
                          className="absolute top-2 right-2 w-6 h-6 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    
                    {!photo && (
                      <label className="aspect-square border-2 border-dashed border-muted-foreground/30 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                        <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground text-center">
                          Adicionar Foto
                        </span>
                        <input
                          type="file"
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
                    ].map((item) => (
                      <div key={item.key} className="flex items-center space-x-2">
                        <Checkbox
                          id={item.key}
                          checked={formData[item.key as keyof Pet] as boolean}
                          onCheckedChange={(checked) => handleInputChange(item.key, !!checked)}
                        />
                        <Label htmlFor={item.key}>{item.label}</Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

          <div className="text-center py-8">
            <Button type="submit" size="lg" className="px-12 py-6 text-lg">
              <Heart className="w-5 h-5 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default EditarPet;