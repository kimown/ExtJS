<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<style type="text/css">
</style>
<script type="text/javascript" src="/ExtJS/ext-2.0.2/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="/ExtJS/ext-2.0.2/ext-all-debug.js"></script>
<link rel="stylesheet" type="text/css" href="/ExtJS/ext-2.0.2/resources/css/ext-all.css">
 <!-- custom includes -->
    <script language="javascript" src="SessionProvider.js"></script>
    <script type="text/javascript" src="TabCloseMenu.js"></script>
    <script type="text/javascript" src="FeedViewer.js"></script>
    <script type="text/javascript" src="FeedWindow.js"></script>
    <script type="text/javascript" src="FeedGrid.js"></script>
    <script type="text/javascript" src="MainPanel.js"></script>
    <script type="text/javascript" src="FeedPanel.js"></script>
    <link rel="stylesheet" type="text/css" href="feed-viewer.css" /> 
<title>采购系统</title>
</head>
<body>
	<div id="header">
		<div style="float:right;margin:5px;" class="x-small-edition">
		</div>
	</div>
	<textarea id="preview-tpl" style="display:none;">
		<div class="post-data">
			<span class="post-data">{pubDate:date("M j,Y,g:i a")}</span>
			<h3 class="post-title">{title}</h3>
			<h4 class="post-author">by {author:defaultValue("Unknown")}</h4>
		</div>
		<div class="post-body">{content:this.getBody}</div>
	</textarea>
</body>
<script type="text/javascript">
/**
 * 
 */
</script>
</html>