// Interface para o resultado do geocoding
export interface GeocodingResult {
    bairro: string;
    cidade: string;
    estado: string;
    endereco_completo: string;
    coordenadas: {
        lat: number;
        lng: number;
    };
}

// Função para buscar endereço por CEP usando a API ViaCEP
export async function buscarEnderecoPorCEP(cep: string): Promise<GeocodingResult | null> {
    try {
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        const response = await fetch(url);
        const data = await response.json();

        if (!data.erro) {
            const endereco: GeocodingResult = {
                bairro: data.bairro,
                cidade: data.localidade,
                estado: data.uf,
                endereco_completo: `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`,
                coordenadas: {
                    lat: 0, // A API ViaCEP não fornece coordenadas, então definimos como 0
                    lng: 0  // A API ViaCEP não fornece coordenadas, então definimos como 0
                }
            };
            return endereco;
        }
        return null;
    } catch (error) {
        console.error('Erro na requisição da API:', error);
        return null;
    }
}
