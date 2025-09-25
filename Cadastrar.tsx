import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

// Esquema de validação com Zod
const petFormSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  species: z.enum(['Cachorro', 'Gato'], { required_error: 'Selecione a espécie.' }),
  breed: z.string().min(2, 'A raça é obrigatória.'),
  age: z.string().min(1, 'A idade é obrigatória.'),
  gender: z.enum(['Macho', 'Fêmea'], { required_error: 'Selecione o gênero.' }),
  description: z.string().min(20, 'A descrição deve ter pelo menos 20 caracteres.'),
  // Adicione outros campos conforme sua tabela no Supabase
});

type PetFormValues = z.infer<typeof petFormSchema>;

const CadastrarPet = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PetFormValues>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: '',
      breed: '',
      age: '',
      description: '',
    },
  });

  // Função que envia os dados para o Supabase
  async function onSubmit(data: PetFormValues) {
    setIsSubmitting(true);
    try {
      // Supondo que você tenha uma tabela 'pets' no Supabase
      const { error } = await supabase
        .from('pets')
        .insert([
          {
            name: data.name,
            species: data.species,
            breed: data.breed,
            age: data.age,
            gender: data.gender,
            description: data.description,
            // Removendo o sistema de verificação: o pet já é aprovado
            is_approved: true, 
            // Adicione aqui o ID do usuário logado, se necessário
            // user_id: (await supabase.auth.getUser()).data.user?.id 
          },
        ]);

      if (error) {
        throw error;
      }

      toast({
        title: 'Sucesso! 🎉',
        description: 'O pet foi cadastrado e já está disponível para adoção.',
      });

      navigate('/adotar'); // Redireciona para a página de adoção

    } catch (error) {
      console.error('Erro ao cadastrar o pet:', error);
      toast({
        title: 'Erro ao cadastrar',
        description: 'Ocorreu um problema ao enviar os dados. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Cadastrar um Novo Pet</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Pet</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Bob" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="species"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Espécie</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a espécie" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Cachorro">Cachorro</SelectItem>
                            <SelectItem value="Gato">Gato</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gênero</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o gênero" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Macho">Macho</SelectItem>
                            <SelectItem value="Fêmea">Fêmea</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="breed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Raça</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: SRD (Sem Raça Definida)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Idade</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 2 anos" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Conte um pouco sobre o temperamento, história e necessidades do pet."
                          className="resize-none"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Futuramente, aqui entrará o upload de fotos */}

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Cadastrar Pet'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default CadastrarPet;