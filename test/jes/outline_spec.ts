import {buildJsonOutline} from "../../src/jes/outline"
import {ObjectItemNode, StringNode, NumberNode, ObjectNode, ArrayNode} from "../../src/jes/ast"
import {setParentRecursively} from "../utils"

describe("The jes outline capabilities", () => {

    it("can create an outline from an ObjectNode Ast", () => {

        let key1 = new ObjectItemNode(new StringNode("key1"), new NumberNode("333"))
        let key2 = new ObjectItemNode(new StringNode("key2"), new NumberNode("666"))
        let key3 = new ObjectItemNode(new StringNode("key3"), new NumberNode("999"))

        let objectNode = new ObjectNode([key1, key2, key3])
        setParentRecursively(objectNode)

        let expected = {
            name:     "object",
            node:     objectNode,
            children: [
                {
                    name:     "key1",
                    node:     key1,
                    children: []
                },
                {
                    name:     "key2",
                    node:     key2,
                    children: []
                },
                {
                    name:     "key3",
                    node:     key3,
                    children: []
                }
            ]
        }
        let actual = buildJsonOutline(objectNode)
        expect(actual).to.deep.equal(expected)
    })

    it("can create an outline from an ArrayNode Ast", () => {

        let key1 = new ObjectItemNode(new StringNode("key1"), new NumberNode("333"))
        let key2 = new ObjectItemNode(new StringNode("key2"), new NumberNode("666"))
        let key3 = new ObjectItemNode(new StringNode("key3"), new NumberNode("999"))

        let arrayNode = new ArrayNode([key1, key2, key3])
        setParentRecursively(arrayNode)

        let expected = {
            name:     "array",
            node:     arrayNode,
            children: [
                {
                    name:     "key1",
                    node:     key1,
                    children: []
                },
                {
                    name:     "key2",
                    node:     key2,
                    children: []
                },
                {
                    name:     "key3",
                    node:     key3,
                    children: []
                }
            ]
        }
        let actual = buildJsonOutline(arrayNode)
        expect(actual).to.deep.equal(expected)
    })


    it("will remove collections with just a single item from the outline", () => {

        let key1 = new ObjectItemNode(new StringNode("key1"), new NumberNode("333"))
        let nestedKey = new ObjectItemNode(new StringNode("nested_key1"), new NumberNode("111"))
        let nestedObject = new ObjectNode([nestedKey])
        let key2 = new ObjectItemNode(new StringNode("key2"), nestedObject)

        let objectNode = new ObjectNode([key1, key2])
        setParentRecursively(objectNode)

        let expected = {
            name:     "object",
            node:     objectNode,
            children: [
                {
                    name:     "key1",
                    node:     key1,
                    children: []
                },
                {
                    name:     "key2",
                    node:     key2,
                    children: [{
                        name:     "nested_key1",
                        node:     nestedKey,
                        children: []
                    }]
                }
            ]
        }
        let actual = buildJsonOutline(objectNode)
        expect(actual).to.deep.equal(expected)
    })

    it("will remove keyless collections from the outline", () => {

        let key1 = new ObjectItemNode(new StringNode("key1"), new NumberNode("333"))
        let keylessNested = new ArrayNode([new ArrayNode([new ObjectNode([])])])
        let key2 = new ObjectItemNode(new StringNode("key2"), keylessNested)
        let objectNode = new ObjectNode([key1, key2])
        setParentRecursively(objectNode)

        let expected = {
            name:     "object",
            node:     objectNode,
            children: [
                {
                    name:     "key1",
                    node:     key1,
                    children: []
                },
                {
                    name:     "key2",
                    node:     key2,
                    children: []
                }
            ]
        }
        let actual = buildJsonOutline(objectNode)
        expect(actual).to.deep.equal(expected)
    })

})
