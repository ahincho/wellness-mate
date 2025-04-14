<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# 📖 Description

Welcome to the **Wellness Mate API** 🌿. This application is designed to provide personalized health and wellness suggestions to patients based on their medical history 🩺.

By leveraging cutting-edge **Artificial Intelligence (AI)** technologies 🤖, particularly **Large Language Models (LLMs)** and ChatBots like **OpenAI (GPT)** and **AWS Bedrock (Nova Micro)**, Wellness Mate offers insightful recommendations to help guide patients in managing their health 🧠✨.

All API endpoints are secured with **JWT Bearer Token** authentication 🔐 to ensure that only authorized users can access sensitive data. The API is designed to be simple, scalable, and easy to integrate with your healthcare systems ⚙️📈.

> Built with the [NestJS](https://github.com/nestjs/nest) framework 🚀.

**📌 Version:** 0.0.1  
**👤 Author:** [Angel Hincho](https://github.com/ahincho) – ahincho@unsa.edu.pe  
**📄 Terms of Service:** [https://github.com/ahincho/wellness-mate](https://github.com/ahincho/wellness-mate)

## 🛠️ Project Setup

Install the project dependencies by running:

```bash
$ npm install
```

## ⚡ Compile and Run the Project

To compile and run the project, use one of the following commands:

```bash
# 🧑‍💻 Development
$ npm run start

# 👀 Watch Mode (auto-restarts on file changes)
$ npm run start:dev

# 🚀 Production Mode
$ npm run start:prod
```

## 🧪 Run Tests

To run tests for the project, use the following commands:

```bash
# 🧑‍🔬 Unit tests
$ npm run test

# 🌐 End-to-End (e2e) tests
$ npm run test:e2e

# 📊 Test coverage
$ npm run test:cov
```

## 🚀 Deployment & Infrastructure (Docker)

This section explains how to containerize and spin up the application along with its database using Docker and Docker Compose.

### 🐳 Dockerization

The project includes a `Dockerfile` to build a production-ready image of the NestJS app.

#### 🏗️ Build the Image

Run the following command in the root directory:

```bash
docker build -t wellness-mate:0.0.1 .
```

### ⚙️ Running the Environment with Docker Compose

To start the API and database locally, run the following command in the project root:

```bash
docker-compose up -d
```

### 🧠 AI Integration

This project includes integration with both **OpenAI** and **Amazon Bedrock** to provide intelligent features and suggestions powered by LLMs (Large Language Models).

These integrations are encapsulated in a shared module (`ai`) and are designed to be easily extendable or switchable based on the use case.

> Make sure to configure your credentials and endpoints properly in the environment variables when running in production.

## 📚 Resources

Check out a few resources that may come in handy when working with NestJS:

- 📖 Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- 💬 For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- 🎥 To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- ☁️ Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- 📊 Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- 🧑‍💻 Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- 📢 To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- 💼 Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## 🤖 AI & Cloud Services Documentation

- 📖 [OpenAI API Documentation](https://platform.openai.com/docs/api-reference/introduction)
- 📦 [OpenAI npm package](https://www.npmjs.com/package/openai)
- 📦 [AWS Bedrock Runtime npm package](https://www.npmjs.com/package/@aws-sdk/client-bedrock-runtime)
- 📦 [AWS Credential Providers npm package](https://www.npmjs.com/package/@aws-sdk/credential-providers)
- ☁️ [AWS SDK for JavaScript](https://aws.amazon.com/es/sdk-for-javascript/)
- 🌐 [AWS Bedrock](https://aws.amazon.com/es/bedrock/)
- 📖 [Models Supported by AWS Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html)
- 📄 [Nova Micro User Guide](https://docs.aws.amazon.com/pdfs/nova/latest/userguide/nova-ug.pdf)

## 🤝 Support

Nest is an MIT-licensed open-source project. It can grow thanks to the sponsors and support from the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## 📞 Stay in touch

- ✍️ Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- 🌐 Website - [https://nestjs.com](https://nestjs.com/)
- 🐦 Twitter - [@nestframework](https://twitter.com/nestframework)

## 📝 License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
