# GUIA PARA USO DAS FUNÇÕES DO BACK-END

## IMPORTANTE

-   Esse documento **NÃO É A VERSÃO FINAL**, assim pode e será alterado com o decorrer do desenvolvimento
-   A estrutura deste deverá conter o seguinte para cada função:
    -   **Utilidade:** Explicação de para o que ela é usada, explicitando quando utiliza-lá
    -   **Rota:** Rota do back-end para integração.
    -   **Input:** Quais paremetros e de quais tipos serão recebidos.
    -   **Validação:** Nivel de validação da mesma / exigência de token.
    -   **Retorno:**
        -   **Estrutura:** A estrutura do JSON, quais parametros são retornados, de qual tipo e conteudo.
        -   **Explicação:** Referente aos erros e devidas mensagem e status code.

### SOBRE TOKEN

Fique ciente de que sempre que for citado o token com `TRUE` neste arquivo, se refere a necessidade de ser passado o
**TOKEN** no campo `Authorization` no header da requisição.

### SOBRE INPUTS

Toda propriedade com tipo `string` e contendo um `enum` deve receber **APENAS UM** dos valores contidos nesse enum.

## USER

> BASE_URL: `http://"endereco_ip":5000/users`

-   **CREATE** -> METODO: `POST` | URL:

    > _ainda em desenvolvimento_
    >
    > **TOKEN:** `FALSE`
    >
    > **UTILIDADE:** Registro de um novo usuário **SEM** o nutritionalData
    >
    > **INPUT** - Recebe um objeto com as seguintes propriedades:
    >
    > -   `name: {type: String}`
    > -   `email: {type: String, unique: true, regex.teste: true}`
    > -   `password: {type: String}`
    > -   `tel: {type: String, unique: true}`
    > -   `nutritionalDataId` -> campo como null, sendo definido posteriormente

    > **RETORNO:** `STATUS: 201 | JSON: newUser`

-   **UPDATE** -> METODO: `PUT` | URL:

    > _ainda em desenvolvimento_
    >
    > **TOKEN:** `TRUE`
    >
    > **UTILIDADE:** Atualização de campos do perfil de usuário **EXCETO** nutritionalDataId
    >
    > **INPUT** - Recebe um objeto com as seguintes propriedades:
    >
    > -   `name: {type: String}`
    > -   `email: {type: String, unique: true, regex.teste: true}`
    > -   `password: {type: String}`
    > -   `tel: {type: String, unique: true}`
    > -   `nutritionalDataId` -> definido apenas pelo `nutritionalDataController`

    > **RETORNO:** `STATUS: 201 | JSON: updateUser`

-   **DELETE** -> METODO: `DELETE` | URL:

    > _ainda em desenvolvimento_
    >
    > **TOKEN:** `TRUE`
    >
    > **UTILIDADE:** Apaga usuário do banco de dados
    >
    > **INPUT** - Não recebe **NENHUM** paramêtro

    > **RETORNO:** `STATUS: 201 | JSON: deleteUser`

-   **GET** -> METODO: `GET` | URL:

    > _ainda em desenvolvimento_
    >
    > **TOKEN:** `TRUE`
    >
    > **UTILIDADE:** Retorna os dados do usuário que está logado
    >
    > **INPUT** - Não recebe **NENHUM** paramêtro

    > **RETORNO:** `STATUS: 201 | JSON: user`

---

## NUTRITIONAL DATA

> BASE_URL: `http://"endereco_ip":5000/datas`

-   **CREATE** -> METODO: `POST` | URL:

    > _ainda em desenvolvimento_
    >
    > **TOKEN:** `TRUE`
    >
    > **UTILIDADE:** Registro e associação de uma nutritionalData com o seu user
    >
    > **INPUT** - Recebe um objeto com as seguintes propriedades:
    >
    > -   `birthDate: {type: Date}`
    > -   `height: {type: Number}`
    > -   `weight: {type: Number}`
    > -   `allergy: {type: [String], default: ["Sem alergias alimentares"]}`
    > -   `profession: {type: String}`
    > -   `bodyFatPercentage: {type: String, enum: ['Alto percentual de massa muscular', 'Equilíbrio entre massa muscular e gordura', 'Alto percentual de gordura corporal', 'Não sei']}`
    > -   `metabolicRate: {type: String, enum: ['Metabolismo acelerado (perco peso facilmente)','Metabolismo moderado (peso estável com facilidade)','Metabolismo mais lento (tenho tendência a ganhar peso)'],}`
    > -   `goal: {type: String,enum: ['Ganhar peso', 'Perder peso', 'Manter peso'],}`\
    >     **NÃO PRECISAM SER PASSADOS:**
    > -   `createAt: {type: Date, default: Date.now}` -> Recebe a data do momento da criação
    > -   `updateAt: {type: Date}` -> Campo criado null e alterado apenas no update
    > -   `userId: {type: mongoose.Schema.Types.ObjectId, unique: true}` -> Recolhe o id do token

    > **RETORNO:** `STATUS: 201 | JSON: nutritionalData

-   **UPDATE** -> METODO: `PUT` | URL:
    > _ainda em desenvolvimento_
    >
    > **TOKEN:** `TRUE`
    >
    > **UTILIDADE:** Atualização de campos do nutritionalData
    >
    > **INPUT** - Recebe um objeto com as seguintes propriedades:
    >
    > -   `birthDate: {type: Date}`
    > -   `height: {type: Number}`
    > -   `weight: {type: Number}`
    > -   `allergy: {type: [String], default: ["Sem alergias alimentares"]}`
    > -   `profession: {type: String}`
    > -   `bodyFatPercentage: {type: String, enum: ['Alto percentual de massa muscular', 'Equilíbrio entre massa muscular e gordura', 'Alto percentual de gordura corporal', 'Não sei']}`
    > -   `metabolicRate: {type: String, enum: ['Metabolismo acelerado (perco peso facilmente)','Metabolismo moderado (peso estável com facilidade)','Metabolismo mais lento (tenho tendência a ganhar peso)'],}`
    > -   `goal: {type: String,enum: ['Ganhar peso', 'Perder peso', 'Manter peso'],}`\
    >     **NÃO PRECISAM SER PASSADOS:**
    > -   `createAt: {type: Date, default: Date.now}` -> Recebe a data do momento da criação
    > -   `updateAt: {type: Date}` -> Reccebe a data do momento da alteração mais recente
    > -   `userId: {type: mongoose.Schema.Types.ObjectId, unique: true}` -> Recolhe o id do token
    > **RETORNO:**
    >
    > -   `STATUS: 201 | JSON: updateData`
    > -   `STATUS: 404 | JSON: {message: 'Nutritional data not found'}`

-   **DELETE** -> METODO: `DELETE` | URL:

    > _ainda em desenvolvimento_
    >
    > **TOKEN:** `TRUE`
    >
    > **UTILIDADE:** Deleta o nutritionalData do usuário logado.
    >
    > **INPUT** - Não recebe **NENHUM** paramêtro

    > **RETORNO:** `STATUS: 201 | JSON: nutriData`

-   **GET** -> METODO: `GET` | URL:

    > _ainda em desenvolvimento_
    >
    > **TOKEN:** `TRUE`
    >
    > **UTILIDADE:** Retorna os dados nutricionais do usuário que está logado
    >
    > **INPUT** - Não recebe **NENHUM** paramêtro

    > **RETORNO:**
    >
    > -   `STATUS: 201 | JSON: nutritionalData`
    > -   `STATUS: 404 | JSON: {message: 'Nao ha dados nutricionais cadastrados para esse usuario'}`

-   **GET BY ID** -> METODO: `GET` | URL: `/:id`

    > _ainda em desenvolvimento_
    >
    > **TOKEN:** `TRUE`
    >
    > **UTILIDADE:** Retorna os dados nutricionais do id informado.
    >
    > **INPUT** - Parametro `id` contendo `nutritionalDataId`

    > **RETORNO:**
    >
    > -   `STATUS: 201 | JSON: nutritionalData`
    > -   `STATUS: 404 | JSON: {message: 'Dados nutricionais nao encontrados com esse ID'}`

---

## MEAL

> BASE_URL: `http://"endereco_ip":5000/meals`

-   **CREATE** -> METODO: `POST` | URL:

    > _ainda em desenvolvimento_
    > **TOKEN:** `TRUE`
    >
    > **UTILIDADE:** Registro e associação de uma refeição "meal" com o seu user
    >
    > **INPUT** - Recebe um objeto com as seguintes propriedades:
    >
    > - `type: {type: String, enum: ['Cafe da manha', 'Almoco', 'Lanche', 'Janta']}`
    > - `description: {type: String}`
    > - `date: {type: Date}`
    > - `updateAt: {type: Date}` -> Campo criado null e alterado apenas no update
    > - `userId: {type: mongoose.Schema.Types.ObjectId, unique: true}` -> Recolhe o id do token

    > **RETORNO:** `STATUS: 201 | JSON: newMeal

-   **UPDATE** -> METODO: `PUT` | URL: `/:id`

    > _ainda em desenvolvimento_
    >
    > **TOKEN:** `TRUE`
    >
    > **UTILIDADE:** Atualização de campos do nutritionalData
    >
    > **INPUT** - Recebe o id referente ao meal que será atualizado, junto a um objeto com as seguintes propriedades:
    >
    > - `type: {type: String, enum: ['Cafe da manha', 'Almoco', 'Lanche', 'Janta']}`
    > - `description: {type: String}`
    > - `date: {type: Date}`
    > - `updateAt: {type: Date}` -> Definido como a data da atualização
    >
    > **RETORNO:**
    >
    > -   `STATUS: 201 | JSON: meal`
    > -   `STATUS: 404 | JSON: {message: 'Nao existe refeicao com este ID!'}`

-   **DELETE** -> METODO: `DELETE` | URL: `/:id`

    > _ainda em desenvolvimento_
    >
    > **TOKEN:** `TRUE`
    >
    > **UTILIDADE:** Deleta o meal do id informado.
    >
    > **INPUT** - Parametro `id` contendo `meal._id`

    > **RETORNO:** `STATUS: 201 | JSON: meal`

-   **GET BY ID** -> METODO: `GET` | URL: `/:id`

    > _ainda em desenvolvimento_
    >
    > **TOKEN:** `TRUE`
    >
    > **UTILIDADE:** Retorna o meal do id informado.
    >
    > **INPUT** - Parametro `id` contendo `meal._id`

    > **RETORNO:**
    >
    > -   `STATUS: 201 | JSON: meal`
    > -   `STATUS: 404 | JSON: {message: 'Nao existe refeicao com este ID!'}`

-   **GET ALL OF USER** -> METODO: `GET` | URL:

    > _ainda em desenvolvimento_
    >
    > **TOKEN:** `TRUE`
    >
    > **UTILIDADE:** Retorna todos os meals do usuário logado.
    >
    > **INPUT** - Não recebe **NENHUM** paramêtro

    > **RETORNO:**
    >
    > -   `STATUS: 201 | JSON: meals`
    > -   `STATUS: 404 | JSON: {message: 'Nao ha refeicoes para este usuario!'}`
