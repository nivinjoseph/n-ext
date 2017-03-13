import * as assert from "assert";
import "../src/arrayExt";


suite("remove",
    () =>
    {
        test("should pass",
            () => 
            {
                let collection = [1, 2, 3, 4, 5];
                let take = collection.take(2);
                assert.deepEqual(take.length, 2);
            });

    }); 
