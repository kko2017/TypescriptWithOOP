{
    console.log(this);

    function testCall() {
        console.log(this);
    }

    testCall();

    var relationship = {
        name: 'zero',
        friends: ['nero', 'hero', 'xero'],
        logFriends: function () {
            const that = this;
            this.friends.forEach( function (friend) {
                console.log(that.name, friend);
            });
        }
    };

    relationship.logFriends();

    console.clear();

    class Counter {
        // 멤버 변수들이자 Instance 멤버레벨에 남는다.
        count = 0;
        increase = function () {
            console.log(this);
        }
        // 🚩 아래와 같은 상황들을 해결하기 가장 쉬운 방법은 arrow
        //  function을 사용하는 거다. 화살 함수 속 this는 부모
        // 스코프를 가리킨다. lexical scope (<-> dynamic scope)의 
        // 좋은 예다.
        // increase = () => {
        //     console.log(this);
        // }

        // 멤버 함수 => 함수는 __proto__에 들어간다.
        // increase() {
        //     console.log(this);
        // }
    };

    const counter = new Counter();
    // increase는 함수표현식이기 때문에 진행결과를 보기위해선
    // 메서드로 처리해야 한다. 즉, ()가 붙어야 한다.
    counter.increase(); 
    // 하지만 함수표현식을 다른 변수에 복사할 때는 그냥 변수로
    // 대입시킨다. 즉, ()가 붙을 필요가 없다. 그리고 pass by
    // value가 되기 때문에 복사한 변수를 변경하여도 increase의
    // 내용이 변하지 않는다.
    let caller = counter.increase;
    // undefined가 나는 이유는 복사 후 this가 어디를 가르키는지
    // 알 수가 없기 때문이다.
    caller();

    //  🚩 만약 복사한 increase의 this를 여전히 Counter클래스롤 지정하고
    // 싶다면 bind 메서드를 사용하면 된다. caller를 호출하면 this는
    // Counter를 가르킴을 알 수 있다.
    // let caller = counter.increase.bind(counter);
    // caller();

    // 위와 다르게 var 키워드로 받으면 글로벌 환경(window)에 등록
    // 되므로 window.caller()로 호출하면 this가 window로 나타나게 
    // 된다. 밑의 참고내용 참조해라.
    // var caller = counter.increase;
    // window.caller();

    caller = function () {
        console.log('test');
    };
    caller();
    counter.increase();

    // 참고로 let, const 키워드는 특정 스코프안에 들어가 있지 않음에도
    // winodow(글로벌)에 등록되지 않는다. 반면 함수는
    // window에 등록된다.(예, window.helloWorld()) var 키워드만
    // 유일하게 함수처럼 window에 포함된다.
    function helloWorld() { console.log('hello') };
    window.helloWorld();

    console.clear();

    class Bob { }
    const bob = new Bob();
    bob.run = counter.increase;
    // bob이라는 인스턴스를 분명히 명시하므로 this는 Bob임을 인지한다.
    bob.run();
}