/* 260. Returning Values from Async Functions */

/* At this point,
we have a pretty good idea
of how to work with async/await, right?
However, there is one important thing missing.
So right now, it might still be a little bit unclear
what an async function actually is and how it works.
And so let's now fix that.
So to understand a bit better,
what's actually happening here.
Let's start by adding some more console.logs here.
So let's say, will get location.
And then in the second one here, we will say,
finished getting location.
And if we check the result here, now,
I hope that you already know
what the order of the logs here will be.
So let's see.
And so indeed,
immediately we get the first log then the second one.
And of course only after that
we get all the logs coming from the async function.
So again,
that's because this is an async function
that runs in the background.
And so JavaScript immediately moves on
to the next line here.
Now, if this was indeed a regular function
and there would be a console.log in that regular function,
then of course, that would appear here between one and two.
Right? Well, let's call this three here, actually.
So it will then appear between one and three,
but in this case it's an async function,
and so therefore it runs in the background
until the results are there,
all right.
But now let's say that we wanted to return some data
from this function, all right?
So let's first get rid of all these console.logs here.
Put this all a bit better together.
And so here at the end let's now say we wanted to return
a string like we had previously based on the geocoding data.
So that data is in dataGeo
and so let's say you are in
dataGeo.city
and then just quickly the country here as well.
So we return this string here
and so let's say we now want to get,
of course that data out here.
And so for now, let's pretend
that this is simply a regular function
and then we would do this,
we would simply define a variable.
Then there, we would store that returned value.
And then here, we could take a look at that,
but what do you think is going to happen here in this case?
Well, let's see.
And so the second thing that is logged to the console here
is this promise.
And remember that back then,
when we first started to work with async/await,
I told you that an async function always returns a promise.
And so here is the proof for that.
And if we think about this,
then it actually makes sense that here we get a promise
and not the value that we would like to get.
So the string here, right?
The reason for that is that at this point of the code,
JavaScript has simply no way of knowing yet
there's a string here that we want
because the function is still running,
but it is also not blocking the code out here.
And so therefore again, at this point,
JavaScript has no way of knowing
what will be returned from this function.
And so therefore all that this function does return
is a promise.
Now the value that we return from an async function,
so again, that's this string here
will become the fulfilled value of the promise
that is returned by the function.
And so that's important to understand.
So again, this promise that we see down here,
the fulfilled value of that promise
is going to be this string here,
because that is the value that we return
from the async function
while at least if there is no error here happening
in the function,
but for now, let's assume the success here again.
So since we know that this here will return a promise,
we also know how we can actually get the data that we want.
So all we need to do instead of this here
is simply, whereAmI,
let's comment out these two,
and so this will be our promise.
Then just like before
we can use the then method to get the fulfilled value
of the promise.
Let's call that one city now.
All right?
So we're using the exact same variable name
like we did here,
but of course this one here didn't work,
but here it is going to work.
Because again, in the then handler,
this argument that will be passed into the callback function
is going to be the result value of the promise.
And so one more time,
that is this string here that is returned
from the async function.
And so now let's see what happens.
Let's wait for it.
Now we get our result, you are in Olhao, Portugal.
And so with this,
we essentially, successfully returned a value
from the function.
Now we will be able to do a little bit better,
but for now let's think about errors.
So if any error occurs here in this try block,
then this return here will never be reached
because the code will immediately jump
here to the catch block, right?
So let's just try to create some error here.
I will just change this one here,
so now nothing will work,
so let's wait for it.
And so indeed, now we have an error.
Now here we get undefined from line five, four, three.
That's this one.
And so indeed now nothing was returned from the function,
we get undefined.
Now what's interesting here is that the log still worked.
This console.log here,
which has now logging undefined here is still running,
which means that this callback function is still running,
which means that the then method was called,
which in turn means that this promise here
was actually fulfilled and not rejected.
So even though there was an error in the async function,
the promise that the async function returns
is still fulfilled and not rejected, right?
And in fact, if we add a catch handler here,
then let's see what happens.
So console.error,
error.message,
then our emoji here.
And actually let's add a two here.
So the sequence is kind of one, two, three,
and let's do the same here.
All right?
And so we should still get the error from here
and indeed we do,
but still it is this callback here that is executed.
So that's why we get two undefined and not the catch block.
And so again,
what that means is that even though there was an error
in the async function,
the promise that it returns is still fulfilled.
Now, if we wanted to fix that,
if we want to be able to catch that error here as well,
then we would have to rethrow that error right here.
Rethrowing the error means to basically
throw the error again so that we can then propagate it down.
And so with that, we will manually reject a promise
that's returned from the async function.
So let's say reject promise returned from async function.
So here we can now take the error and throw it again.
So throw error,
and so now we get the same error here as we had here.
So again, it's, cannot read property flag of undefined
and here the same and with this too.
So it just coming from here.
And so sometimes it's important to do this.
And so rethrowing an error is then the correct solution
to that problem, all right?
And now finally, if we wanted to fix the, not the error,
but the fact that the three is printed before the two,
well then how would we do that?
Well, we can simply add a finally here, right?
Because the finally, as you already know,
is always gonna be executed.
So no matter what,
all right?
So now we only get the one
then we should get the two with the error
and then the number three.
And indeed, if we remove now the error from here,
then one, two, three, just as expected,
all right?
So I admit that this might've been a little bit confusing,
but I hope that you understood
how all the pieces fit together here.
Now this of course works just fine, but in my opinion,
there's still a problem here.
And that problem is the fact that doing this here
kind of makes this the philosophy of async/await
with handling promises using then and catch, right?
So we are mixing the old
and the new way of working with promises here,
all in the same code.
And that's something that I personally don't like.
So I prefer to always just use async functions
instead of having to mix them.
And so let's now go ahead
and convert this to async/await as well.
And we can do that because, of course,
we can treat the promise here that has returned
just like any other promise.
And so of course we are able to handle it
using async/await.
So that's what we're going to do next.
Now it would be great if we could simply use await
without the async function,
but that doesn't really work, at least for now,
because there is actually a proposal in the works
to make this happen, but for now,
await can only be used inside an async function.
However, we don't really want a new complete function here,
and so instead we can use an IIFE.
So remember IIFEs from way back,
they are immediately-invoked function expressions.
And remember that this is how we create one.
So we write function
then here the function body,
and then in the end we simply call it.
And so of course we can also easily create
an async
IIFE as well,
all right?
And actually this pattern here
is one of the last remaining cases for IIFEs, all right?
And now I actually want to leave the conversion of this
to the async function for you as a small challenge.
So please pause the video now
and take a minute or two
and write the code yourself here.
All right.
So let's start with the try catch block.
So try catch, here We get access to the error
and then let's actually immediately do this part.
And then here we can simply await the whereAmI promise,
okay?
And then all we have to do is to store that result
into the city variable and then log that to the console.
So that's just this,
and now finally, this last part here,
we can simply put it outside of the try catch block.
And so then it is always gonna be executed no matter what.
Okay?
So let's comment this one out
and we should get the exact same result
and let's wait for it.
And here we go.
So great. We managed to do the conversion
and now everything is using async/await.
And so that's much nicer.
And now we know how to basically return data
from an async function
and how to properly receive and handle that returned data.
Right?
And actually in the real life,
this is something that happens all the time.
So it's pretty common that we have async functions
calling other async functions
and returning values between them.
And so that's the reason why I'm showing you all this.
To make sure that you really correctly understand
how async functions work behind the scenes.
*/
