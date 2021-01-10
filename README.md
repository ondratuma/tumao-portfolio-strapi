# Next.js + Strapi portfolio
- [strapi repository](https://github.com/ondratuma/tumao-portfolio-strapi)
- [next.js repository](https://github.com/ondratuma/tumao-portfolio-next)

## Create your own:


1. Deploy strapi:

[![Deploy to DO](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/ondratuma/tumao-portfolio-strapi/tree/main)

2. Add content in strapi

    Fill all single type fields. Special guidelines below:
   
   | Datatype | Description | Restriction |
   | ---------- | ------------- | ------------- |
   | Content->Pages | Names of pages | exactly 3 children |
   | Content->My_traits | First page scroller settings | 1...n |
   | Content->Form->Button_labels |  Labels for send button | exactly 4 in order (send, sending, sent, try_again) |

    Filled examples bellow:
    ![Content](https://s3.eu-central-1.amazonaws.com/tumao.dev/example-content.png)
    ![General string](https://s3.eu-central-1.amazonaws.com/tumao.dev/example-general-string.png)
   


3. Deploy frontend
   
[![Deploy to DO](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/ondratuma/tumao-portfolio-next/tree/main)

# Local development

### Strapi part
```bash
yarn develop
```

### Next.js part
```bash
yarn dev
```

you need to provide expected environment variables as specified in .do/deploy.template.yaml
