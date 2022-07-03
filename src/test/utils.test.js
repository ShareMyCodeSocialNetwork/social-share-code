import {isEmpty} from "../components/utils/Utils";


describe('Test function utils', () => {

    describe('Test function isEmpty', () => {

        it('Test validate isEmpty null or undefined value',  () => {
            const testEmptyNull = null
            const testEmptyUndefined = undefined
            expect(isEmpty(testEmptyNull)).toEqual(true);
            expect(isEmpty(testEmptyUndefined)).toEqual(true);
        });

        it('Test validate isEmpty not null or not undefined value',  () => {
            const testNotEmpty = ["test","not","empty"]
            expect(isEmpty(testNotEmpty)).toEqual(false);
            expect(!isEmpty(testNotEmpty)).toEqual(true);

        });

    });

});

