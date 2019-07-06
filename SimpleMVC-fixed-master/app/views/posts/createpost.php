<center>
    <div class='relative'>
        <h1>Create Post Here</h1>
        <form method="POST" action="<?php echo $_SERVER['REQUEST_URI'] ?>">
            <input class="form-post" value="" type="text" placeholder="Title" name="title" required="required"><br>
            <textarea rows="23" class="textarea-post" type="text" placeholder="Your content is here" name="content" required="required"></textarea><br>
            <button class="sub-btn">Create</button>
        </form>
    </div>
</center>