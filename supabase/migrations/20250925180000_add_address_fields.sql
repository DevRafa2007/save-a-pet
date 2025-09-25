-- Adiciona campos de endereço à tabela pets
ALTER TABLE public.pets
ADD COLUMN cep TEXT,
ADD COLUMN bairro TEXT,
ADD COLUMN cidade TEXT,
ADD COLUMN estado TEXT,
ADD COLUMN coordenadas POINT;

-- Atualiza a função de validação de localização
CREATE OR REPLACE FUNCTION validate_location()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.cep IS NULL OR NEW.bairro IS NULL OR NEW.cidade IS NULL OR NEW.estado IS NULL THEN
    RAISE EXCEPTION 'Todos os campos de endereço são obrigatórios (CEP, bairro, cidade, estado)';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Cria trigger para validar localização
CREATE TRIGGER validate_pet_location
  BEFORE INSERT OR UPDATE ON public.pets
  FOR EACH ROW
  EXECUTE FUNCTION validate_location();

-- Cria índice para busca por proximidade
CREATE INDEX idx_pets_coordenadas ON public.pets USING gist(coordenadas);

-- Função para calcular distância entre dois pontos
CREATE OR REPLACE FUNCTION calculate_distance(lat1 float, lon1 float, lat2 float, lon2 float)
RETURNS float AS $$
DECLARE
  R float := 6371; -- Raio da Terra em quilômetros
  dlat float;
  dlon float;
  a float;
  c float;
BEGIN
  -- Converte graus para radianos
  dlat := radians(lat2 - lat1);
  dlon := radians(lon2 - lon1);
  lat1 := radians(lat1);
  lat2 := radians(lat2);

  -- Fórmula de Haversine
  a := sin(dlat/2)^2 + cos(lat1) * cos(lat2) * sin(dlon/2)^2;
  c := 2 * atan2(sqrt(a), sqrt(1-a));
  
  RETURN R * c;
END;
$$ LANGUAGE plpgsql;

-- Função para buscar pets por proximidade
CREATE OR REPLACE FUNCTION search_pets_by_location(
  search_lat float,
  search_lon float,
  max_distance float DEFAULT 10 -- distância máxima em km, padrão 10km
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  distance float
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    calculate_distance(
      search_lat,
      search_lon,
      coordenadas[0],
      coordenadas[1]
    ) as distance
  FROM public.pets p
  WHERE calculate_distance(
    search_lat,
    search_lon,
    coordenadas[0],
    coordenadas[1]
  ) <= max_distance
  AND p.is_available = true
  ORDER BY distance;
END;
$$ LANGUAGE plpgsql;