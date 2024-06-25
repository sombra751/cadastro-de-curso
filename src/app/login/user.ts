export interface User {
    id: number | any;
    nome: string | any;
    telefone: string | any; // Alterei para string, pois o telefone parece ser uma string
    email: string | any;
    numero: string | any;
    complemento: string | any;
    rua: string | any;
    bairro: string | any;
    cidade: string | any;
    estado: string | any;
    cep: string | any;
    password: string | any;
    testes: Testes[];
}
  
  export interface Testes {
    id: string | any
    nome: string | any
    usuarioId: string | any
    roleId: string | any
  }