import { NgModule } from "@angular/core";
import { HttpClientModule, HttpHeaders } from "@angular/common/http";

// Apollo
import { ApolloModule, Apollo } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
// "http://165.22.12.102/graphql"


let develop = "http://192.168.0.5:8000/graphql"
@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule]
})
export class GraphQLModule {

  
  constructor(apollo: Apollo, httpLink: HttpLink) {

    
    apollo.create({
      link: httpLink.create({ uri: develop, withCredentials: true}),
      cache: new InMemoryCache() as any,
    });
    
  }
}


