<?php 
    include "layout.php";
    if (!isset($_SESSION['logged'])) header("Location: forbidden.html");// sau này đổi thành 403 forbidden
?>
<title>Create Post</title>
<center>
<div class="relative box-create">
    <center><div style="font-size:30px; font-family:Comic Sans MS; font-weight:200;padding: 20px 20px;">
        Create Post Here
    </div></center>
    <form method="POST" action="create.php">
        <input value="" name="title" placeholder="Title" class="form-create" type="text" required="required"><br>
        <textarea name="content" type="text" required="required" class="text-area"></textarea><br>
        <button class="btn sub-btn" type="submit" name="submit">Create</button>
    </form>
</div>
</center>

<?php
    if (isset($_POST['title']) && isset($_POST['content'])){
        $result = mysqli_query($conn,"SELECT * FROM posts WHERE id=(SELECT MAX(id) FROM posts);");
        if (mysqli_num_rows($result)==0){
            $newid = 1;
        }
        else{
            $data = mysqli_fetch_assoc($result);
            $newid = $data['id'] + 1;
        }
        
        // $title = strtoupper($_POST['title']);
        $title = $_POST['title'];
        $content = $_POST['content'];
        // $created_at = date("d")."-".date("m")."-"."20".date("y");
        $result = mysqli_query($conn,"INSERT INTO posts (id,title,content) VALUES($newid,'".$title."','".$content."');");
        mysqli_commit($conn);
        echo "<script>alert('Created post successfully')</script>";
    }
?>