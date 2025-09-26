// Sua chave da API do Google Maps
export const API_KEY: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Interface para os componentes de endereço da resposta da API
export interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
}

// Interface para a estrutura da resposta da API
export interface GeocodeResult {
    address_components: AddressComponent[];
    formatted_address: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
}

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

// Função para buscar endereço por CEP
export async function buscarEnderecoPorCEP(cep: string): Promise<GeocodingResult | null> {
    try {
        const url: string = `https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'OK' && data.results.length > 0) {
            const result: GeocodeResult = data.results[0];
            const endereco: GeocodingResult = {
                bairro: '',
                cidade: '',
                estado: '',
                endereco_completo: result.formatted_address,
                coordenadas: {
                    lat: result.geometry.location.lat,
                    lng: result.geometry.location.lng
                }
            };

            // Processa os componentes do endereço
            result.address_components.forEach(component => {
                if (component.types.includes('sublocality_level_1')) {
                    endereco.bairro = component.long_name;
                }
                if (component.types.includes('administrative_area_level_2')) {
                    endereco.cidade = component.long_name;
                }
                if (component.types.includes('administrative_area_level_1')) {
                    endereco.estado = component.long_name;
                }
            });

            return endereco;
        }
        return null;
    } catch (error) {
        console.error('Erro na requisição da API:', error);
        return null;
    }
}