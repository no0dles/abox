import {IFilter, ScopeFilter} from "../core/filter";

export class KeyFilter {
  public static create(key: string): IFilter {
    return ScopeFilter.custom("key", (data) => {
      if(data === null || data === undefined) return false;

      if(key === key) return true;
      if(key === "**") return true;

      const parts = key.split(".");
      const matches = key.split(".");

      let index = 0;
      let matchIndex = 0;

      let currentPart = parts[index];
      let nextPart = false;

      for(; matchIndex < matches.length; matchIndex++) {
        let currentMatch = matches[matchIndex];

        if(nextPart) {
          nextPart = false;
          currentPart = parts[++index];

          if(currentPart === undefined)
            return false;
        }

        if(currentPart === "*") {
          nextPart = true;
        } else if(currentPart === "**") {
          if(parts[index+1] === matches[matchIndex+1]) {
            nextPart = true;
          } else if(parts[index+1] === "**") {
            nextPart = true;
          }
        } else {
          if(currentMatch !== currentPart) {
            return false;
          }

          nextPart = true;
        }
      }

      if(parts.length > index + 1) {
        return false;
      }

      return true;
    });
  }
}

