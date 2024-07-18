export namespace ProductModel {
  export namespace Request {
    export interface Create {
      id: string;
      name: string;
      description: string;
      logo: string;
      date_release: string;
      date_revision: string;
    }

    export interface Update {
      id: string;
      name: string;
      description: string;
      logo: string;
      date_release: string;
      date_revision: string;
    }
  }

  export namespace Response {
    export type GetAll = GetAll.Datum[];

    export namespace GetAll {
      export interface Datum {
        id: string;
        name: string;
        description: string;
        logo: string;
        date_release: string;
        date_revision: string;
      }
    }

    export type Create = Create.Datum;

    export namespace Create {
      export interface Datum {
        id: string;
        name: string;
        description: string;
        logo: string;
        date_release: string;
        date_revision: string;
      }
    }

    export type Update = Update.Datum;

    export namespace Update {
      export interface Datum {
        id: string;
        name: string;
        description: string;
        logo: string;
        date_release: string;
        date_revision: string;
      }
    }

    export interface Delete {
      message: string;
    }
  }
}
