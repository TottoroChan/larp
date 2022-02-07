export class RulesFile {
    title: string;
    content: RuleContent[]

    constructor(title: string, content: RuleContent[]) {
        this.title = title;
        this.content = content;
    }
}

export class RuleContent {
    title: string;
    content: string;

    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
    }
}