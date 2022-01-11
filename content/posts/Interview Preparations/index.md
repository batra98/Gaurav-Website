---
title: Interview Preparation blog
description: Record of my learnings as part of Interview Preparation
date: '2022-01-03'
draft: false
slug: '/pensieve/interview-preparation'
tags:
  - learning
---

This new year, I decided to record my interview prearation journey and hopefully it will help someone like me in the future. So here goes nothing.

## Rubrik Interview

### System Coding Round (Date - 10/01/2022)

- This round will mainly focus on concurrency and multithreading concepts.
- I have negligible knowledge on these topics. But, I like the challenge
- I have exactly 1 week for preparations, so let's try to make the most of it.

[03/01/2022]

- Awesome post on medium to get started on things: [Rubrik Interview Experience](https://abhinav-prakash.medium.com/rubrik-india-sde-2-interview-experience-72477c72ec8).

- Found a Youtube Playlist: [Bo Quian's Cpp Playlist](https://www.youtube.com/watch?v=LL8wkskDlbs&list=PL5jc9xFGsL8E12so1wlMS0r0hTQoJL74M)
- Things learned from the playlist:

  - How to create threads.
  - Achieve syncronization using locks and mutexes.
  - Conditional variables (avoid busy waiting).
  - Future and Options
  - Async functions
  - Packaged Task

- Got basic understanding of concepts. Tommorrow will move on to more practical things.

[04/01/2022]

- Tried solving [Leetcode playlist](https://leetcode.com/problemset/concurrency/) on concurreny.
- Solved the following problems:

* [Complement Base 10](https://leetcode.com/problems/complement-of-base-10-integer/): Bit Manuplation

    <details>
    <summary>Cpp Implementation</summary>

    ```cpp

    class Solution {
    public:
        int bitwiseComplement(int n) {

            int x = 1;
            while(x<n)
                x = x*2+1;
            return x^n;

        }
    };

    ```

    </details>

- [Print in order](https://leetcode.com/problems/print-in-order/): Synchronisation using [condition_variable](https://en.cppreference.com/w/cpp/thread/condition_variable) and [mutexes](https://en.cppreference.com/w/cpp/thread/unique_lock).

    <details>
    <summary>Cpp Implementation</summary>

    ```cpp

    class Foo {
        public:

            int count = 0;
            mutex mu;
            condition_variable c;


            Foo() {

                count = 1;

            }

            void first(function<void()> printFirst) {


                unique_lock lck(mu);
                count++;
                // printFirst() outputs "first". Do not change or remove this line.
                printFirst();

                lck.unlock();
                c.notify_all();
            }

            void second(function<void()> printSecond) {


                unique_lock lck(mu);
                while(count != 2)
                {
                    c.wait(lck);
                }

                count++;
                // printSecond() outputs "second". Do not change or remove this line.
                printSecond();


                lck.unlock();
                c.notify_all();
            }

            void third(function<void()> printThird) {

                unique_lock lck(mu);
                while(count != 3)
                {
                    c.wait(lck);
                }


                // printThird() outputs "third". Do not change or remove this line.
                printThird();
                lck.unlock();
            }

        };

    ```
    </details>

- [Print FooBar](https://leetcode.com/problems/print-foobar-alternately/): Synchronisation using [condition_variable](https://en.cppreference.com/w/cpp/thread/condition_variable) and [mutexes](https://en.cppreference.com/w/cpp/thread/unique_lock).

    <details>
        <summary>Cpp Implementation</summary>

    ```cpp

    class FooBar {
    private:
        int n;

    public:
        mutex mu;
        condition_variable c;
        bool is_foo = true;
        FooBar(int n) {
            this->n = n;
        }

        void foo(function<void()> printFoo) {

            for (int i = 0; i < n; i++) {

                unique_lock lck(mu);

                while(!is_foo)
                {
                    c.wait(lck);
                }
                is_foo = false;
            // printFoo() outputs "foo". Do not change or remove this line.
            printFoo();

                lck.unlock();
                c.notify_all();
            }
        }

        void bar(function<void()> printBar) {

            for (int i = 0; i < n; i++) {

                unique_lock lck(mu);

                while(is_foo)
                {
                    c.wait(lck);
                }
                is_foo = true;
            // printBar() outputs "bar". Do not change or remove this line.
            printBar();
                lck.unlock();
                c.notify_all();

            }

        }
    };

    ```

  </details>

- Started the [Back to Basics: Cpp Concurrency](https://www.youtube.com/watch?v=riUCrKQ_ezc).
- I could not spend more time today, but will try to spend more time tommorrow.

[05/01/2022 - 06/01/2022]

- I have been chilling a lot. Haven't even completed the previous video.
- Need to devote more time to this.

[07/01/2022-08/01/2022]

- Completed the video series.
- Solved a couple of problems on Leetcode and Lintcode. Some of them are as below:

* [Building H20](https://leetcode.com/problems/building-h2o/)

  <details>
    <summary>Cpp Implementation</summary>

  ```cpp

    class H2O {
    public:

        mutex mu;

        condition_variable c;
        int num_hyd;
        int num_oxy;
        int count;

        H2O() {
            num_hyd = 0;
            num_oxy = 0;

        }

        void hydrogen(function<void()> releaseHydrogen) {

            unique_lock<mutex> lck(mu);

            while(num_oxy*2 < num_hyd)
            {
                c.wait(lck);
            }
            // releaseHydrogen() outputs "H". Do not change or remove this line.
            // cout << "H\n";

            releaseHydrogen();
            num_hyd++;

            lck.unlock();
            c.notify_all();
        }

        void oxygen(function<void()> releaseOxygen) {

            unique_lock<mutex> lck(mu);

            while(num_oxy*2 > num_hyd)
            {
                c.wait(lck);
            }
            // releaseOxygen() outputs "O". Do not change or remove this line.
            // cout << "O\n";
            releaseOxygen();
            num_oxy++;

            lck.unlock();
            c.notify_all();
        }
    };

  ```

  </details>

* [Dining Philosophers](https://leetcode.com/problems/the-dining-philosophers/)

    <details>
        <summary>Cpp Implementation</summary>
    
    ```cpp

        class DiningPhilosophers {
        public:


            mutex mu;
            condition_variable c;
            vector<bool> fork;

            DiningPhilosophers() {

                for(int i=0;i<5;i++)
                    fork.push_back(true);

            }

            void wantsToEat(int philosopher,
                            function<void()> pickLeftFork,
                            function<void()> pickRightFork,
                            function<void()> eat,
                            function<void()> putLeftFork,
                            function<void()> putRightFork) {


                {
                    unique_lock lck(mu);

                    while(fork[philosopher%5] == false && fork[(philosopher+1)%5] == false)
                    {
                        c.wait(lck);
                    }

                    fork[philosopher%5] = false;
                    fork[(philosopher+1)%5] = false;


                    pickLeftFork();
                    pickRightFork();
                    eat();
                    putLeftFork();
                    putRightFork();

                    fork[philosopher%5] = true;
                    fork[(philosopher+1)%5] = true;

                    lck.unlock();
                    c.notify_all();
                }





            }
        };

  ```
  </details>
  

- Lintcode has a lot of interesting problems, will some more tommorrow.
- Also, remember to give the OA for Schrodinger.

[10/01/2022]
- The interview went good. The interviewer was a nice person. Enjoyed the interview a lot.

[11/01/2022]
- Got a mail for a second round of interviews 🎉🎉🎉.
- Will start a new thread on that soon. 