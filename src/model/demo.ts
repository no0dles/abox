import {Required} from "../validator/decorators/required";
import {String} from "../validator/decorators/string";
import {Observable} from "rxjs";
import {DecoratorFactory} from "../core/decorator/decorator.factory";

function Model(key: string) {
  return DecoratorFactory.action("model", key);
}

function Column() {
  return () => {

  };
}

function Key() {
  return () => {

  };
}

@Model("user")
export class User {
  @Key()
  @Column(String)
  public id: string;

  @Column(String, Required)
  public username: string;

  @Required()
  @String()
  public email: string;

  @Required()
  @String()
  public password: string;

  @Required()
  public groups: string[];
}

@Model("group")
export class Group {
  @Required()
  @String()
  public name: string;

  @Required()
  public permissions: string[];
}

@Model("permission")
export class Permission {
  @Required()
  public name: string;

  @Required()
  public description: string;
}

@Model("api")
export class Api {
  @Required()
  @String()
  public name: string;

  @Required()
  public user: string;
}

@Model("stage")
export class Stage {
  @Required()
  public api: string;
}

@Model("deployment")
export class Deployment {
  @Required()
  public stage: string;

  @Required()
  public deployedAt: Date;
}

@Model("log")
export class Log {
  @Required()
  public deployment: string;

  @Required()
  @String()
  public message: string;
}

@Key("create.model")
export class CreateModel {
  public model: any;
}

@Key("update.model")
export class UpdateModel {
  public model: any;
}

@Key("query.model")
export class QueryModel {
  public model: any;
  public filter: any;
  public select: string[];
}

@Key("delete.model")
export class DeleteModel {
  public model: any;
}

export interface IMigrationContext {

}

export interface IMigration {
  up(context: IMigrationContext, done: () => void): void;
  down(context: IMigrationContext, done: () => void): void;
}

export class FirstMigration implements IMigration {
  up(context: IMigrationContext, done: ()=>void): void {

  }

  down(context: IMigrationContext, done: ()=>void): void {

  }
}





export type Operator = "==" | ">=" | "<=" | "<" | ">" | "!=";

export class OneQuery<TModel> {
  public execute(): Observable<TModel> {
    return null;
  }
}

export class Query<TModel> {
  constructor(private typeFactory: { new(): TModel }) {

  }

  public where(selector: (model: TModel) => string, op: Operator, value: any): Query<TModel> {
    return this;
  }

  public select(selector: (model: TModel) => string[]): Query<TModel> {
    return this;
  }

  public take(value: number): Query<TModel> {
    return null;
  }

  public skip(value: number): Query<TModel> {
    return null;
  }

  public first(): OneQuery<TModel> {
    return null;
  }

  public execute(): Observable<TModel[]> {
    return null;
  }
}

var query = new Query(User)
  .where(m => m.username, "==", "test")
  .where(m => m.groups)
  .select(m => [m.username, m.email])
  .first()
  .execute(model => {

  });
