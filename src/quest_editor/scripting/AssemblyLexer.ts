export enum TokenType {
    Int,
    Float,
    InvalidNumber,
    Register,
    Label,
    CodeSection,
    DataSection,
    StringSection,
    InvalidSection,
    String,
    UnterminatedString,
    Ident,
    InvalidIdent,
    ArgSeparator,
}

export type Token =
    | IntToken
    | FloatToken
    | InvalidNumberToken
    | RegisterToken
    | LabelToken
    | CodeSectionToken
    | DataSectionToken
    | StringSectionToken
    | InvalidSectionToken
    | StringToken
    | UnterminatedStringToken
    | IdentToken
    | InvalidIdentToken
    | ArgSeparatorToken;

export type IntToken = {
    type: TokenType.Int;
    col: number;
    len: number;
    value: number;
};

export type FloatToken = {
    type: TokenType.Float;
    col: number;
    len: number;
    value: number;
};

export type InvalidNumberToken = {
    type: TokenType.InvalidNumber;
    col: number;
    len: number;
};

export type RegisterToken = {
    type: TokenType.Register;
    col: number;
    len: number;
    value: number;
};

export type LabelToken = {
    type: TokenType.Label;
    col: number;
    len: number;
    value: number;
};

export type CodeSectionToken = {
    type: TokenType.CodeSection;
    col: number;
    len: number;
};

export type DataSectionToken = {
    type: TokenType.DataSection;
    col: number;
    len: number;
};

export type StringSectionToken = {
    type: TokenType.StringSection;
    col: number;
    len: number;
};

export type InvalidSectionToken = {
    type: TokenType.InvalidSection;
    col: number;
    len: number;
};

export type StringToken = {
    type: TokenType.String;
    col: number;
    len: number;
    value: string;
};

export type UnterminatedStringToken = {
    type: TokenType.UnterminatedString;
    col: number;
    len: number;
    value: string;
};

export type IdentToken = {
    type: TokenType.Ident;
    col: number;
    len: number;
    value: string;
};

export type InvalidIdentToken = {
    type: TokenType.InvalidIdent;
    col: number;
    len: number;
};

export type ArgSeparatorToken = {
    type: TokenType.ArgSeparator;
    col: number;
    len: number;
};

export class AssemblyLexer {
    private line!: string;
    private index = 0;

    private get col(): number {
        return this.index + 1;
    }

    private _mark = 0;

    tokenize_line(line: string): Token[] {
        this.line = line;
        this.index = 0;
        this._mark = 0;

        const tokens: Token[] = [];

        while (this.has_next()) {
            const char = this.peek();
            let token: Token;

            if ("/" === char) {
                this.skip();

                if ("/" === this.peek()) {
                    break;
                } else {
                    this.back();
                }
            }

            if (/\s/.test(char)) {
                this.skip();
                continue;
            } else if (/[-\d]/.test(char)) {
                token = this.tokenize_number_or_label();
            } else if ("," === char) {
                token = { type: TokenType.ArgSeparator, col: this.col, len: 1 };
                this.skip();
            } else if ("." === char) {
                token = this.tokenize_section();
            } else if ('"' === char) {
                token = this.tokenize_string();
            } else if ("r" === char) {
                token = this.tokenize_register_or_ident();
            } else {
                token = this.tokenize_ident();
            }

            tokens.push(token);
        }

        return tokens;
    }

    private has_next(): boolean {
        return this.index < this.line.length;
    }

    private next(): string {
        return this.line.charAt(this.index++);
    }

    private peek(): string {
        return this.line.charAt(this.index);
    }

    private skip(): void {
        this.index++;
    }

    private back(): void {
        this.index--;
    }

    private mark(): void {
        this._mark = this.index;
    }

    private marked_len(): number {
        return this.index - this._mark;
    }

    private slice(): string {
        return this.line.slice(this._mark, this.index);
    }

    private eat_rest_of_token(): void {
        while (this.has_next()) {
            const char = this.next();

            if (/[\s,]/.test(char)) {
                this.back();
                break;
            }
        }
    }

    private tokenize_number_or_label(): IntToken | FloatToken | InvalidNumberToken | LabelToken {
        this.mark();
        const col = this.col;
        this.skip();
        let is_label = false;

        while (this.has_next()) {
            const char = this.peek();

            if ("." === char || "e" === char) {
                return this.tokenize_float(col);
            } else if ("x" === char) {
                return this.tokenize_hex_number(col);
            } else if (":" === char) {
                is_label = true;
                this.skip();
                break;
            } else if (/[\s,]/.test(char)) {
                break;
            } else {
                this.skip();
            }
        }

        const value = parseInt(this.slice(), 10);

        return {
            type: Number.isInteger(value)
                ? is_label
                    ? TokenType.Label
                    : TokenType.Int
                : TokenType.InvalidNumber,
            col,
            len: this.marked_len(),
            value,
        };
    }

    private tokenize_hex_number(col: number): IntToken | InvalidNumberToken {
        this.eat_rest_of_token();
        const hex_str = this.slice();

        if (/^0x[\da-fA-F]+$/.test(hex_str)) {
            const value = parseInt(hex_str, 16);

            if (Number.isInteger(value)) {
                return {
                    type: TokenType.Int,
                    col,
                    len: this.marked_len(),
                    value,
                };
            }
        }

        return {
            type: TokenType.InvalidNumber,
            col,
            len: this.marked_len(),
        };
    }

    private tokenize_float(col: number): FloatToken | InvalidNumberToken {
        this.eat_rest_of_token();
        const float_str = this.slice();

        if (/^-?\d+(\.\d+)?(e-?\d+)?$/.test(float_str)) {
            const value = parseFloat(float_str);

            if (Number.isFinite(value)) {
                return {
                    type: TokenType.Float,
                    col,
                    len: this.marked_len(),
                    value,
                };
            }
        }

        return {
            type: TokenType.InvalidNumber,
            col,
            len: this.marked_len(),
        };
    }

    private tokenize_register_or_ident(): RegisterToken | IdentToken | InvalidIdentToken {
        const col = this.col;
        this.skip();
        this.mark();
        let is_register = false;

        while (this.has_next()) {
            const char = this.peek();

            if (/\d/.test(char)) {
                is_register = true;
                this.skip();
            } else {
                break;
            }
        }

        if (is_register) {
            const value = parseInt(this.slice(), 10);

            return {
                type: TokenType.Register,
                col,
                len: this.marked_len() + 1,
                value,
            };
        } else {
            this.back();
            return this.tokenize_ident();
        }
    }

    private tokenize_section():
        | CodeSectionToken
        | DataSectionToken
        | StringSectionToken
        | InvalidSectionToken {
        const col = this.col;
        this.mark();

        while (this.has_next()) {
            if (/\s/.test(this.peek())) {
                break;
            } else {
                this.skip();
            }
        }

        switch (this.slice()) {
            case ".code":
                return { type: TokenType.CodeSection, col, len: 5 };
            case ".data":
                return { type: TokenType.DataSection, col, len: 5 };
            case ".string":
                return { type: TokenType.StringSection, col, len: 7 };
            default:
                return { type: TokenType.InvalidSection, col, len: this.marked_len() };
        }
    }

    private tokenize_string(): StringToken | UnterminatedStringToken {
        const col = this.col;
        this.mark();
        this.skip();
        let prev_was_bs = false;
        let terminated = false;

        outer: while (this.has_next()) {
            switch (this.next()) {
                case "\\":
                    prev_was_bs = true;
                    break;
                case '"':
                    if (!prev_was_bs) {
                        terminated = true;
                        break outer;
                    }

                    prev_was_bs = false;
                    break;
                default:
                    prev_was_bs = false;
                    break;
            }
        }

        let value: string;

        if (terminated) {
            value = JSON.parse(this.slice());
        } else {
            value = JSON.parse(this.slice() + '"');
        }

        return {
            type: terminated ? TokenType.String : TokenType.UnterminatedString,
            col,
            len: this.marked_len(),
            value,
        };
    }

    private tokenize_ident(): IdentToken | InvalidIdentToken {
        const col = this.col;
        this.mark();

        while (this.has_next()) {
            const char = this.peek();

            if (/[\s,]/.test(char)) {
                break;
            } else if ("/" === char) {
                this.skip();

                if (this.peek() === "/") {
                    this.back();
                    break;
                }
            } else {
                this.skip();
            }
        }

        const value = this.slice();
        const type = /^[a-z][a-z0-9_=<>!]*$/.test(value) ? TokenType.Ident : TokenType.InvalidIdent;

        if (type === TokenType.Ident) {
            return {
                type,
                col,
                len: this.marked_len(),
                value,
            };
        } else {
            return {
                type,
                col,
                len: this.marked_len(),
            };
        }
    }
}
