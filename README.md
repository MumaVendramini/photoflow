📸 PhotoFlow

PhotoFlow é uma aplicação web feita em React com foco no agendamento de serviços fotográficos, especialmente para fotografia de imóveis. A ferramenta foi criada para otimizar e automatizar o processo de agendamento entre empresas e equipes de fotógrafos, permitindo que clientes escolham horários disponíveis sem depender de ligações manuais.

✨ Principais Recursos

Autenticação com Firebase Authentication

Controle de acesso por tipo de usuário (Cliente, Fotógrafo, Admin, Super)

Agendamento inteligente de serviços

Dashboard exclusivo por perfil de usuário

Gerenciamento de usuários com ativação/inativação

PWA (Progressive Web App) com ícone e nome personalizados

Tema global e componentes estilizados com styled-components

Arquitetura escalável para múltiplas empresas

🚀 Tecnologias Utilizadas

React.js

Firebase (Auth + Firestore)

React Router

Styled-Components

Lucide React

Vite (futuramente planejado)

🔐 Perfis de Usuário

super_user: Acesso completo ao sistema, gerenciamento de admins e configurações gerais

admin: Gerencia usuários e agendas de uma empresa específica

fotografo: Visualiza seus próprios agendamentos e confirma presença

cliente: Agenda serviços conforme disponibilidade e acompanha status

📦 Organização do Projeto

photoflow/
├── public/
│   └── icons/                # Ícones para instalação PWA
├── src/
│   ├── components/           # Componentes reutilizáveis e estilizações
│   ├── pages/                # Páginas principais (Dashboard, Users, etc)
│   ├── firebase.js           # Configuração do Firebase
│   ├── App.js                # Roteamento e controle de autenticação
│   ├── theme/                # Tema global do projeto
│   └── index.js
├── .gitignore
├── package.json
└── README.md

⚙️ Como Rodar o Projeto

# Clone o repositório
git clone https://github.com/MumaVendramini/photoflow.git

# Acesse o diretório
cd photoflow

# Instale as dependências
npm install

# Rode o projeto em ambiente de desenvolvimento
npm start

💪 Roadmap (Tarefas)



💬 Contato

Desenvolvido por Muma VendraminiEntre em contato via GitHub ou LinkedIn.

