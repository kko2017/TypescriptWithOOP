{
    interface Either<L, R> {
        left: () => L;
        right: () => R;
    }

    class SimpleEither<L, R> implements Either<L, R> {
        constructor(private leftValue: L, private rightValue: R) { }
        left(): L {
            return this.leftValue;
        }
        right(): R {
            return this.rightValue;
        }
    }

    const best = new SimpleEither({ name: 'ellie' }, 'hello');
    console.log(best.left());
    console.log(best.right());

}