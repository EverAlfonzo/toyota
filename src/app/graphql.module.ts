import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

// Apollo
import { ApolloModule, Apollo } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
// "http://165.22.12.102/graphql"
@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule]
})
export class GraphQLModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    let develop = "http://localhost:8000/graphql"
    apollo.create({
      link: httpLink.create({ uri: develop}),
      cache: new InMemoryCache() as any
    });
  }
}
