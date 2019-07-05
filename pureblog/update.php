<?php 
    include "layout.php";
    if (!isset($_SESSION['logged'])) header("Location: forbidden.html");
?>
<title>Update Post</title>
<?php 
    $url = $_SERVER['REQUEST_URI'];
    $filename = $_SERVER['PHP_SELF'];
    $id = str_split($url,strlen($filename)+4)[1];
    $result = mysqli_query($conn,"SELECT * FROM posts WHERE id=".$id." ");
    $data = mysqli_fetch_assoc($result);
?>
<center>
<div class="relative box-create">
    <center><div style="font-size:30px; font-family:Comic Sans MS; font-weight:200;padding: 20px 20px;">
        Update Post 
    </div></center>
    <form method="POST">
        <input value="<?php echo $data['title']; ?>" name="title" placeholder="Title" class="form-create" type="text" required="required"><br>
        <textarea name="content" type="text" placeholder="Your words here" required="required" class="text-area"><?php echo htmlspecialchars( $data['content']); ?></textarea><br>
        <button class="btn sub-btn" type="submit" name="submit">Update</button>
    </form>
</div>
</center>
<?php 
    if (isset($_POST['title']) && isset($_POST['content'])){
        $newtitle = $_POST['title'];
        $newcontent = $_POST['content'];
        $result = mysqli_query($conn,"UPDATE posts SET title= '".$newtitle."' , content= '".$newcontent."' WHERE id = ".$data['id']." ;");
        mysqli_commit($conn);
        header("Location: /post.php?id=".$data['id']."");
    }
    
?>
