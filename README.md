Utilizado na contrusção dessa api
.Express + Zod + Prisma 
.SQLite (apenas para testes) 
.Vitest para testes automatizados 
.Arquitetura limpa e escalável


Pra rodar a api baixe os fontes do repositorio git no endereço git: https://github.com/VelosoSolutionP/api-frota-express.git
rode os comando: 
.cd api-frota-express
.npm install
.npx prisma generate
.npx prisma migrate dev --name init
.npm test
.npm run dev

Testando a api no postman
===========================================================================================================================================================================================================================
Cadastro de Veiculos

Criando um novo veiculo:
<img width="1526" height="865" alt="image" src="https://github.com/user-attachments/assets/2a85fc5f-0a8e-4d75-98e3-038589b83b5d" />

Editando um veiculo:
<img width="1523" height="872" alt="image" src="https://github.com/user-attachments/assets/e86462c8-1271-480b-8ef8-7be6fde58bf6" />

Excluir um veiculo:
<img width="1528" height="872" alt="image" src="https://github.com/user-attachments/assets/d5b5b269-065f-4f6b-a5c3-abeb66487f8a" />

Recuperar um automóvel cadastrado pelo seu identificador único:
<img width="1486" height="860" alt="image" src="https://github.com/user-attachments/assets/266c0b0a-0198-4d63-b9f3-ea16396800d8" />

Listar os automóveis cadastrados. Deve ser possível filtrar a listagem dos
automóveis
Por cor:
<img width="1496" height="865" alt="image" src="https://github.com/user-attachments/assets/13f42b86-d92e-4bf6-8790-e98da54ce964" />

Por Marca:
<img width="1493" height="857" alt="image" src="https://github.com/user-attachments/assets/7fdf5e5a-536f-4823-900a-6b436af25f5e" />

Por ambos:
<img width="1513" height="861" alt="image" src="https://github.com/user-attachments/assets/7801e867-4a57-4117-a667-ecd992083d29" />

===========================================================================================================================================================================================================================
Cadastro de Motoristas

Cadastrar um novo motorista:
<img width="1518" height="861" alt="image" src="https://github.com/user-attachments/assets/d6464ba8-dece-4338-91a4-2c63a99d90d1" />

Atualizar um motorista cadastrado:
<img width="1522" height="868" alt="image" src="https://github.com/user-attachments/assets/afed30e6-5eae-4c04-8be2-8516652d0110" />

Excluir um motorista cadastrado:
<img width="1524" height="870" alt="image" src="https://github.com/user-attachments/assets/e02b00de-4c06-42d3-80c7-134d5652047e" />

Recuperar um motorista cadastrado pelo seu identificador único:
<img width="1526" height="860" alt="image" src="https://github.com/user-attachments/assets/fc3d1f26-6085-4b11-ad3a-7852e521a8c3" />

Listar os motoristas cadastrados. Deve ser possível filtrar a listagem dos
motoristas por nome.

Listar:
<img width="1503" height="870" alt="image" src="https://github.com/user-attachments/assets/aa01c026-f273-427e-bbad-1203c6cfc563" />

Filtro por nome:

<img width="1523" height="868" alt="image" src="https://github.com/user-attachments/assets/e618cc80-84b0-481c-81b1-06abf82cc854" />


===========================================================================================================================================================================================================================

Utilização do automóvel

Criar um registro que represente a utilização de um automóvel por um
motorista, com uma data de início e um texto do motivo de utilização:
<img width="1515" height="874" alt="image" src="https://github.com/user-attachments/assets/a58e92b8-06a7-4906-a6fd-5ceecdd05f7f" />

Finalizar a utilização de um automóvel por um motorista guardando a data de
finalização:
<img width="1522" height="866" alt="image" src="https://github.com/user-attachments/assets/bc55b872-f3fe-426d-9dac-6a0fef6e4bde" />

Se tentar finalizar novamente com os mesmos: 
<img width="1525" height="877" alt="image" src="https://github.com/user-attachments/assets/a4c48d63-2b2d-435f-ab1e-a1e077d1f793" />

Listar os registros de utilização cadastrados no sistema com o nome do motorista
e as informações do automóvel utilizado:

<img width="1515" height="869" alt="image" src="https://github.com/user-attachments/assets/01124bff-3779-4c28-9908-9cf38ab55898" />

===========================================================================================================================================================================================================================
Rotas da Api:

Cadastro de Automóvel
Método	Rota	    Descrição	               Body / Query
POST	/automoveis	Criar um novo automóvel	{ "placa": "XYZ-123", "cor": "Preto", "marca": "Honda" }
GET	/automoveis	Listar todos os automóveis, com filtros opcionais por cor e marca	?cor=Preto&marca=Honda
GET	/automoveis/:id	Obter um automóvel pelo ID	—
PUT	/automoveis/:id	Atualizar um automóvel	{ "placa": "XYZ-123", "cor": "Branco", "marca": "Toyota" }
DELETE	/automoveis/:id	Remover um automóvel	—

Cadastro de Motoristas
Método	Rota	    Descrição	               Body / Query
POST	/motoristas	Criar um novo motorista	{ "nome": "Carlos Silva" }
GET	/motoristas	Listar todos os motoristas, com filtro opcional por nome	?nome=Carlos
GET	/motoristas/:id	Obter um motorista pelo ID	—
PUT	/motoristas/:id	Atualizar um motorista	{ "nome": "Carlos Atualizado" }
DELETE	/motoristas/:id	Remover um motorista	—

Utilização de um Automóvel
Método	Rota	      Descrição	                                            Body
POST	/utilizacoes	Criar uma utilização de um automóvel por um motorista	{ "motoristaId": 10, "automovelId": 11, "inicio": "2025-12-01T10:30:00", "motivo": "Entrega de material" }
GET	/utilizacoes	Listar todas as utilizações	—
GET	/utilizacoes/:id	Obter uma utilização pelo ID	—
PATCH	/utilizacoes/:id/finalizar	Finalizar uma utilização, registrando a data/hora de término	{ "fim": "2025-12-01T20:30:00" }













