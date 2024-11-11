# Desafio 03
Nesse desafio desenvolveremos uma API para a adoção de animais, a FindAFriend API, utilizando SOLID e testes.

## RF - Requisitos Funcionais
- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

## RN - Regras de Negócio
- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## RNF - Requisitos Não Funcionais
- [x] Validação de campos com Zod
- [x] ORM utilizando o Prisma
- [x] Docker para instanciar o PostrgreSQL (vamos utilizar a imagem com a versão Alpine)
- [x] Testes unitários utilizando o Vitest
- [x] Testes E2E integrando com o Supertest 

