const awilix = require('awilix')

const container = awilix.createContainer()

container.register({
    accountRepository: awilix.asFunction(require('./data-access-layer/account-repository')),
    accountManager: awilix.asFunction(require('./business-logic-layer/account-manager')),
    accountRouter: awilix.asFunction(require('./presentation-layer/routers/account-router')),
    clubRepository: awilix.asFunction(require('./data-access-layer/club-repository')),
    clubManager: awilix.asFunction(require('./business-logic-layer/club-manager')),
    clubRouter: awilix.asFunction(require('./presentation-layer/routers/club-router')),
    blogpostRepository: awilix.asFunction(require('./data-access-layer/blogpost-repository')),
    blogpostManager: awilix.asFunction(require('./business-logic-layer/blogpost-manager')),
    blogpostRouter: awilix.asFunction(require('./presentation-layer/routers/blogpost-router')),
    variousRouter: awilix.asFunction(require('./presentation-layer/routers/various-router')),
    app: awilix.asFunction(require('./presentation-layer/app'))
})

const app = container.resolve("app")

app.listen(8080)