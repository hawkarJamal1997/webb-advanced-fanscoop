const awilix = require('awilix')

const container = awilix.createContainer()

container.register({
    accountRepository: awilix.asFunction(require('./data-access-layer/account-repository')),
    accountManager: awilix.asFunction(require('./business-logic-layer/account-manager')),
    accountRouter: awilix.asFunction(require('./presentation-layer-website/routers/account-router')),
    accountRouterApi: awilix.asFunction(require('./presentation-layer-api/backend/routers/account-router-api')),
    clubRepository: awilix.asFunction(require('./data-access-layer/club-repository')),
    clubManager: awilix.asFunction(require('./business-logic-layer/club-manager')),
    clubRouter: awilix.asFunction(require('./presentation-layer-website/routers/club-router')),
    clubRouterApi: awilix.asFunction(require('./presentation-layer-api/backend/routers/club-router-api')),
    postRepository: awilix.asFunction(require('./data-access-layer/post-repository')),
    postManager: awilix.asFunction(require('./business-logic-layer/post-manager')),
    postRouter: awilix.asFunction(require('./presentation-layer-website/routers/post-router')),
    postRouterApi: awilix.asFunction(require('./presentation-layer-api/backend/routers/post-router-api')),
    variousRouter: awilix.asFunction(require('./presentation-layer-website/routers/various-router')),
    app: awilix.asFunction(require('./presentation-layer-website/app'))
})

const app = container.resolve("app")

app.listen(80)