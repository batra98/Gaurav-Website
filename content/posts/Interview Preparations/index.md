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

* Started the [Back to Basics: Cpp Concurrency](https://www.youtube.com/watch?v=riUCrKQ_ezc).
* I could not spend more time today, but will try to spend more time tommorrow.
