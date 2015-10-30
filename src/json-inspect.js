var Parser = require('jsonparse');
var C = Parser.C;

function parse(str) {
    if (!str || typeof str !== "string") {
        throw new Error("Not a string!");
    }

    var tree = {
        lines: [],
        fields: []
    };

    // Store line lengths
    var lines = str.split("\n");
    tree.lines = lines.map(function (line) { return line.length; });

    // Parse JSON
    var key = [];
    var top = null;
    var expectKey = false;
    var emit = false;

    function fieldName() {
        var names = [];
        key.forEach(function (item) {
            if (item.key) {
                names.push(item.key);
            }

            if (item.mode === 'array') {
                names.push(item.index);
            }
        });

        return names.join('.');
    }

    function emitField() {
        if (top.emitted) {
            return;
        }

        tree.fields.push({
            key: fieldName(),
            start: top.start,
            end: p.offset,
            value: top.value
        });

        if (top.mode === 'object') {
            expectKey = true;
        }

        if (top.mode === 'array') {
            top.index++;
        }

        top.emitted = true;
    }

    var p = new Parser();
    p._onToken = p.onToken;
    p.onToken = function (token, value) {
        p._onToken(token, value);

        if (emit) {
            emitField();
            emit = false;
        }

        if (token === C.LEFT_BRACE) {
            top = {
                start: p.offset,
                mode: 'object'
            };
            key.push(top);
            expectKey = true;
        } else if (token === C.RIGHT_BRACE) {
            key.pop();
            top = key[key.length - 1];

            if (top.mode === 'array') {
                top.index++;
            }
        } else if (token === C.LEFT_BRACKET) {
            top = {
                start: p.offset,
                mode: 'array',
                index: 0
            };
            key.push(top);
        } else if (token === C.RIGHT_BRACKET) {
            key.pop();
            top = key[key.length - 1];

            if (top.mode === 'array') {
                top.index++;
            } else if (top.mode === 'object') {
                expectKey = true;
            }
        } else if (token === C.STRING || token === C.NUMBER || token === C.NULL) { 
            if (expectKey) {
                top.start = p.offset;
                top.key = value;
                top.value = null;
                expectKey = false;
                return;
            }

            top.value = value;
            top.emitted = false;
            emit = true;
        } else if (token === C.COLON) { 
            // Ignore
        } else if (token === C.COMMA) { 
            top.start = p.offset + 1;
        } else {
            throw new Error("Unknown token: " + token);
        }
    };
    try {
        p.write(str);
    } catch (e) {
        // Ignore
    }

    return tree;
}

function lookupPos(tree, line, ch) {
    var offset = 0;
    for (var i = 0; i < line - 1; i++) { // Lines are index-by-1
        offset += tree.lines[i] + 1; // Add one for newline
    }

    return offset + ch - 1; // Chars are index-by-1
}

function getContext(tree, line, ch) {
    var pos = line;
    if (arguments.length === 3 && ch) {
        pos = lookupPos(tree, line, ch);
    }

    var context = null;
    for (var i = 0; i < tree.fields.length; i++) {
        var field = tree.fields[i];
        if (field.start <= pos && field.end >= pos) {
            context = field;
            break;
        }
    }

    return context;
}

module.exports = function (str, line, ch) {
    var tree = parse(str);
    return getContext(tree, line, ch);
};

module.exports.parse = parse;
module.exports.getContext = getContext;
module.exports.lookupPos = lookupPos;
